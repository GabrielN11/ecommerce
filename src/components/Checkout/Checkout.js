import React from 'react'
import AddressForm from './Forms/AddressForm'
import PaymentForm from './Forms/PaymentForm'
import Stepper from './Stepper/Stepper'
import { CheckoutWindow } from './styles'
import { commerce } from '../../lib/commerce'
import { GlobalContext } from '../GlobalContext'
import { useNavigate } from 'react-router'

const steps = ['Envio', 'Pagamento', 'Finalização']

const Checkout = () => {
    const [activeStep, setActiveStep] = React.useState(0)
    const [shippingData, setShippingData] = React.useState({})
    const [checkoutToken, setCheckoutToken] = React.useState(null)
    const {cart} = React.useContext(GlobalContext)
    const navigate = useNavigate()

    React.useEffect(() => {
        if(cart.total_items > 0){
            const generateToken = async () => {
                try{
                    const token = await commerce.checkout.generateToken(cart.id, { type: 'cart'})
                    setCheckoutToken(token)
                }catch(error){
    
                }
            }
            generateToken()
        }else{
            navigate('/')
        }
    }, [cart, navigate])

    const next = (data) => {
        setShippingData(data)
        setActiveStep(active => active + 1)
    }

    const Form = () => activeStep === 0 ?
        <AddressForm checkoutToken={checkoutToken} setActiveStep={setActiveStep} next={next} shippingData={shippingData}/> :
        <PaymentForm checkoutToken={checkoutToken} setActiveStep={setActiveStep} shippingData={shippingData}/>

    return (
        <CheckoutWindow>
            <Stepper steps={steps} activeStep={activeStep}/>
            {activeStep === steps.length ? <div>Confirmation</div> : checkoutToken && <Form/>}
        </CheckoutWindow>
    )
}

export default Checkout
