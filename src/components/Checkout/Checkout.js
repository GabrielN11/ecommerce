import React from 'react'
import AddressForm from './Forms/AddressForm'
import PaymentForm from './Forms/PaymentForm'
import Stepper from './Stepper/Stepper'
import { CheckoutWindow } from './styles'
import { commerce } from '../../lib/commerce'
import { GlobalContext } from '../GlobalContext'
import { useNavigate } from 'react-router'
import Confirmation from './Confirmation'
import { Head } from '..'

const steps = ['Envio', 'Pagamento', 'Finalização']

const Checkout = () => {
    const [activeStep, setActiveStep] = React.useState(0)
    const [shippingData, setShippingData] = React.useState({})
    const [checkoutToken, setCheckoutToken] = React.useState(null)
    const { cart, order, error, refreshCart, setLoading } = React.useContext(GlobalContext)
    const navigate = useNavigate()

    const test = true //const for testing in case a credit card is not provided by the owner, switch to 'true' to emulate a successful order request
    const [finished, setFinished] = React.useState(false)
    const timeout = test ? () => {
        setTimeout(() => {
            setFinished(true)
            refreshCart()
        }, 3000)
    } : null

    React.useEffect(() => {
        if (cart.total_items > 0) {
            setLoading(true)
            const generateToken = async () => {
                try {
                    const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
                    setCheckoutToken(token)
                } catch (error) {

                }finally{
                    setLoading(false)
                }
            }
            generateToken()
        } else {
            navigate('/')
        }
        return () => {
            setShippingData({})
        }
        // eslint-disable-next-line
    }, [navigate])

    const next = (data) => {
        setShippingData(data)
        setActiveStep(active => active + 1)
    }

    const Form = () => activeStep === 0 ?
        <AddressForm checkoutToken={checkoutToken} setActiveStep={setActiveStep} next={next} shippingData={shippingData} /> :
        <PaymentForm checkoutToken={checkoutToken} setActiveStep={setActiveStep} shippingData={shippingData} timeout={timeout} />

    return (
        <CheckoutWindow>
            <Head title='Checkout' description='Loja de produtos variados, entregamos produtos em todo o Brasil.' />
            <Stepper steps={steps} activeStep={activeStep} />
            {activeStep === steps.length - 1 ? <Confirmation order={order} error={error} finished={finished} /> : checkoutToken && <Form />}
        </CheckoutWindow>
    )
}

export default Checkout
