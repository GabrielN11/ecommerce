import React from 'react'
import { CartEmpty, CartTitle, SideCartHeader, SideCartWindow } from './styles'
import SvgX from '../../assets/SvgX'
import CartItem from './CartItem'

const SideCart = ({setSideCart, cart}) => {
    const [closeAnim, setCloseAnim] = React.useState(false)
    
    function handleClose(){
        setCloseAnim(true)
        setTimeout(() => {
            setSideCart(false)
        }, 600)
    }

    if(closeAnim) return <SideCartWindow closeAnim={true}/>
    return (
        <SideCartWindow closeAnim={false}>
            <SideCartHeader>
                <CartTitle>Carrinho de Compras</CartTitle>
                <SvgX color='#444' size={30} onClick={handleClose} style={{cursor: 'pointer'}}/>
            </SideCartHeader>
            {cart.line_items.map(item => (
                <CartItem key={item.id} item={item}/>
            ))}
            {cart.line_items.length === 0 && <CartEmpty>O carrinho ainda está vazio. Comece a adicionar itens!</CartEmpty>}
        </SideCartWindow>
    )
}

export default SideCart
