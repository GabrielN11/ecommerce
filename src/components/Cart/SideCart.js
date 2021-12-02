import React from 'react'
import { CartButton, CartEmpty, CartTitle, SideCartContainer, SideCartHeader, SideCartWindow, TotalPrice } from './styles'
import SvgX from '../../assets/SvgX'
import CartItem from './CartItem'
import { GlobalContext } from '../GlobalContext'
import { Link } from 'react-router-dom'

const SideCart = ({ setSideCart, cart }) => {
    const [closeAnim, setCloseAnim] = React.useState(false)
    const {emptyCart} = React.useContext(GlobalContext)

    function handleClose() {
        setCloseAnim(true)
        setTimeout(() => {
            setSideCart(false)
        }, 600)
    }

    if (closeAnim) return <SideCartWindow closeAnim={true} />
    return (
        <SideCartWindow closeAnim={false}>
            <SideCartHeader>
                <CartTitle>Carrinho de Compras</CartTitle>
                <SvgX color='#444' size={30} onClick={handleClose} style={{ cursor: 'pointer' }} />
            </SideCartHeader>
            {cart.line_items.map(item => (
                <CartItem key={item.id} item={item} />
            ))}
            {cart.line_items.length > 0 && <>
                <SideCartContainer>
                    <TotalPrice>Total:</TotalPrice>
                    <TotalPrice>{cart.subtotal.formatted_with_symbol}</TotalPrice>
                </SideCartContainer>
                <SideCartContainer>
                    <CartButton color='#6c757d' size={20} onClick={emptyCart}>Esvaziar Carrinho</CartButton>
                    <Link to='/checkout'><CartButton color='#0071DC' size={20} onClick={handleClose}>Finalizar a Compra</CartButton></Link>
                </SideCartContainer>

            </>}
            {cart.line_items.length === 0 && <CartEmpty>O carrinho ainda está vazio. Comece a adicionar itens!</CartEmpty>}
        </SideCartWindow>
    )
}

export default SideCart
