import React from 'react'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Review from '../Review'
import { CartButton } from '../../Cart/styles'
import { GlobalContext } from '../../GlobalContext'
import { commerce } from '../../../lib/commerce'
import Loading from '../../Loading/Loading'
import { useNavigate } from 'react-router-dom'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const PaymentForm = ({ checkoutToken, setActiveStep, shippingData, timeout }) => {

    const [data, setData] = React.useState(checkoutToken)
    const [loaded, setLoaded] = React.useState(false)
    const [discountError, setDiscountError] = React.useState(false)
    const [disabled, setDisabled] = React.useState(false)
    const { handleCaptureCheckout, discountCode, displayAlert, removeFromCart, fetchProducts } = React.useContext(GlobalContext)
    const navigate = useNavigate()

    React.useEffect(() => {
        const checkDiscount = async () => {
            try {
                await commerce.checkout.checkDiscount(checkoutToken.id, { code: discountCode })
            } catch (e) {
                setDiscountError(true)
            }
        }
        const setFetchData = async () => {
            if (discountCode.length > 0) await checkDiscount()
            try {
                const fetchData = await commerce.checkout.checkShippingOption(checkoutToken.id, {
                    shipping_option_id: shippingData.shippingOption,
                    country: shippingData.shippingCountry,
                    region: shippingData.shippingSubdivision
                })
                setLoaded(true)
                return setData(fetchData)
            } catch (e) {
                displayAlert('Algo de errado aconteceu. Tente novamente.', 'danger', 3000)
                setActiveStep(active => active - 1)
            }
        }
        setFetchData()
    }, [discountCode, checkoutToken, shippingData, setActiveStep, displayAlert])

    async function checkQuantity(productId, quantity) {
        try {
            const available = await commerce.checkout.checkQuantity(checkoutToken.id, productId, {
                amount: quantity
            })
            return available.available
        } catch (e) {
            return false
        }
    }

    async function handleSubmit(e, elements, stripe) {
        e.preventDefault()
        setDisabled(true)
        if (!stripe || !elements) return

        for(const item of checkoutToken.live.line_items){
            const available = await checkQuantity(item.id, item.quantity)
            if(!available){
                displayAlert(`Houve um problema para processar a quantidade do produto ${item.name}. Tente novamente.`, 'danger', 10000)
                await removeFromCart(item.id)
                fetchProducts()
                return navigate('/')
            }
        }

        const cardElement = elements.getElement(CardElement)

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement })

        if (error) {
            setDisabled(false)
        } else {
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
                shipping: { name: 'Primary', street: shippingData.address, town_city: shippingData.city, county_state: shippingData.shippingSubdivision, postal_zip_code: shippingData.code, country: shippingData.shippingCountry },
                fulfillment: { shipping_method: shippingData.shippingOption },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id,
                    },
                },
            };
            timeout ? timeout() : handleCaptureCheckout(checkoutToken.id, orderData)
            setActiveStep(active => active + 1)
        }
    }

    return (
        <>
            {loaded ? <div style={{ width: '100%' }}>
                <Review data={data} discountCode={discountCode} discountError={discountError} />
                <Elements stripe={stripePromise}>
                    <ElementsConsumer>
                        {({ elements, stripe }) => (
                            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                                <CardElement />
                                <br /><br />
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <CartButton color='#6c757d' size={30} onClick={() => setActiveStep(active => active - 1)}>Voltar</CartButton>
                                    <CartButton color='#0071DC' size={30} disabled={!stripe || disabled}>Comprar ({data.live.total.formatted_with_symbol})</CartButton>
                                </div>
                            </form>
                        )}
                    </ElementsConsumer>
                </Elements>
            </div> : <Loading loading={true} />}
        </>
    )
}

export default PaymentForm
