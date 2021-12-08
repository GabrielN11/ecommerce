import React from 'react'
import { CartButton, CartEmpty, CartTitle, CartContainer, CartHeader, CartWindow, TotalPrice, CodeInput } from './styles'
import SvgX from '../../assets/SvgX'
import CartItem from './CartItem'
import { GlobalContext } from '../GlobalContext'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useMediaQuery } from 'react-responsive'

const Cart = ({ setSideCart }) => {
    const [closeAnim, setCloseAnim] = React.useState(false)
    const {emptyCart, setDiscountCode, discountCode, cart} = React.useContext(GlobalContext)
    const navigate = useNavigate()
    const mediaQ = useMediaQuery({
        query: '(max-width: 550px)'
    })

    React.useEffect(() => {
        if(mediaQ){
            navigate('/cart')
            setSideCart(false)
        }
        if(!mediaQ) navigate('/')
    }, [mediaQ, navigate, setSideCart])

    function handleClose() {
        setCloseAnim(true)
        setTimeout(() => {
            setSideCart(false)
        }, 600)
    }

    if (closeAnim) return <CartWindow closeAnim={true} />
    return (
        <CartWindow closeAnim={false} mobile={mediaQ}>
            <CartHeader>
                <CartTitle>Carrinho de Compras</CartTitle>
                {!mediaQ && <SvgX color='#444' size={30} onClick={handleClose} style={{ cursor: 'pointer' }} />}
            </CartHeader>
            {cart.line_items && cart.line_items.map(item => (
                <CartItem key={item.id} item={item} />
            ))}
            {cart.line_items && cart.line_items.length > 0 && <>
                <CartContainer>
                    Cupom de desconto:
                    <CodeInput type='text' placeholder='Digite o cupom aqui.' value={discountCode} onChange={({target}) => setDiscountCode(target.value.toUpperCase())}/>
                </CartContainer>
                <CartContainer>
                    <TotalPrice>Total:</TotalPrice>
                    <TotalPrice>{cart.subtotal.formatted_with_symbol}</TotalPrice>
                </CartContainer>
                <CartContainer>
                    <CartButton color='#6c757d' size={20} onClick={emptyCart}>Esvaziar Carrinho</CartButton>
                    <Link to='/checkout'><CartButton color='#0071DC' size={20} onClick={!mediaQ ? handleClose : null}>Finalizar a Compra</CartButton></Link>
                </CartContainer>

            </>}
            {cart.line_items && cart.line_items.length === 0 && <CartEmpty>O carrinho ainda está vazio. Comece a adicionar itens!</CartEmpty>}
        </CartWindow>
    )
}

export default Cart
