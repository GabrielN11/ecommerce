import React from 'react'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Review from '../Review'
import { CartButton } from '../../Cart/styles'
import { GlobalContext } from '../../GlobalContext'
import { commerce } from '../../../lib/commerce'
import Loading from '../../Loading/Loading'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const PaymentForm = ({checkoutToken, setActiveStep, shippingData, timeout}) => {

    const [data, setData] = React.useState(checkoutToken)
    const [loaded, setLoaded] = React.useState(false)
    const {handleCaptureCheckout, discountCode} = React.useContext(GlobalContext)

    React.useEffect(() => {
        const checkDiscount = async () => {
            await commerce.checkout.checkDiscount(checkoutToken.id, { code: discountCode })
        }
        const setFetchData = async () => {
            if(discountCode.length > 0) await checkDiscount()
            const fetchData = await commerce.checkout.checkShippingOption(checkoutToken.id, {
                shipping_option_id: shippingData.shippingOption,
                country: shippingData.shippingCountry,
                region: shippingData.shippingSubdivision
            })
            setLoaded(true)
            return setData(fetchData)
        }
        setFetchData()
    }, [discountCode, checkoutToken, shippingData])
    
    async function handleSubmit(e, elements, stripe){
        e.preventDefault()
        if(!stripe || !elements) return

        const cardElement = elements.getElement(CardElement)

        const {error, paymentMethod} = await stripe.createPaymentMethod({type: 'card', card: cardElement})

        if(error){
            console.log(error)
        }else{
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
        {loaded ? <div style={{width: '100%'}}>
            <Review data={data} discountCode={discountCode}/>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({elements, stripe}) => (
                        <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                            <CardElement/>
                            <br/><br/>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <CartButton color='#6c757d' size={30} onClick={() => setActiveStep(active => active - 1)}>Voltar</CartButton>
                                <CartButton color='#0071DC' size={30} disabled={!stripe}>Comprar ({data.live.total.formatted_with_symbol})</CartButton>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </div> : <Loading loading={true}/>}
        </>
    )
}

export default PaymentForm
