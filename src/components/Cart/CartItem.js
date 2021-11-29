import React from 'react'
import { CartContent, CartInfo, CartQuantity } from './styles'
import { ProdTitle, ProdPrice } from '../Products/styles'
import { GlobalContext } from '../GlobalContext'
import SvgTrash from '../../assets/SvgTrash'

const CartItem = ({item}) => {
    const {handleUpdateCart, removeFromCart} = React.useContext(GlobalContext)

    function handleDelete() {
        removeFromCart(item.id)
    }

    return (
        <CartContent>
            <img src={item.image.url} alt={item.name}/>
            <CartInfo>
                <ProdTitle>{item.name}</ProdTitle>
                <ProdPrice>{item.price.formatted_with_symbol}</ProdPrice>
            </CartInfo>
            <CartInfo style={{marginLeft: 'auto'}}>
                <ProdTitle>Subtotal:</ProdTitle>
                <ProdPrice>{item.line_total.formatted_with_symbol}</ProdPrice>
                <CartQuantity>
                    <div onClick={() => handleUpdateCart(item.id, item.quantity - 1)}>-</div>
                    <div style={{cursor: 'default'}}>{item.quantity}</div>
                    <div onClick={() => handleUpdateCart(item.id, item.quantity + 1)}>+</div>
                </CartQuantity>
            </CartInfo>
            <SvgTrash size={25} style={{alignSelf: 'flex-start', cursor: 'pointer'}} onClick={handleDelete}/>
        </CartContent>
    )
}

export default CartItem
