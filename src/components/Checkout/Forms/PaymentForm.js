import React from 'react'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Review from '../Review'
import { CartButton } from '../../Cart/styles'
import { GlobalContext } from '../../GlobalContext'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const PaymentForm = ({checkoutToken, setActiveStep, shippingData}) => {

    const {handleCaptureCheckout} = React.useContext(GlobalContext)

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

            handleCaptureCheckout(checkoutToken.id, orderData)
            setActiveStep(active => active + 1)
        }
    }

    return (
        <div style={{width: '100%'}}>
            <Review checkoutToken={checkoutToken}/>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({elements, stripe}) => (
                        <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                            <CardElement/>
                            <br/><br/>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <CartButton color='#6c757d' size={30} onClick={() => setActiveStep(active => active - 1)}>Voltar</CartButton>
                                <CartButton color='#0071DC' size={30} disabled={!stripe}>Comprar ({checkoutToken.live.subtotal.formatted_with_symbol})</CartButton>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </div>
    )
}

export default PaymentForm
