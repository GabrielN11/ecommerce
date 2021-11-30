import React from 'react'
import { CartContent, CartInfo, CartQuantity, CartInput } from './styles'
import { ProdTitle, ProdPrice } from '../Products/styles'
import { GlobalContext } from '../GlobalContext'
import SvgTrash from '../../assets/SvgTrash'
import SideLoading from '../Loading/SideLoading'

const CartItem = ({item}) => {
    const {handleUpdateCart, removeFromCart, products, displayAlert, sideLoading} = React.useContext(GlobalContext)
    const [showForm, setShowForm] = React.useState(false)
    const [quantity, setQuantity] = React.useState(item.quantity)
    const input = React.useRef()

    function handleSubmit(e) {
        e.preventDefault()
        input.current.blur()
        handleUpdate(quantity)
    }

    function handleUpdate(qtd){
        for(let i in products){
            if(products[i].id === item.product_id){
                if(qtd <= products[i].inventory.available){
                    setQuantity(qtd) //atualiza o estado para a nova quantidade de itens
                    return handleUpdateCart(item.id, qtd)
                }
                setQuantity(item.quantity)
                return displayAlert(`O estoque máximo atual é de ${products[i].inventory.available} itens.`, 'danger', 4000)
            }

        }
    }

    function handleShowForm() {
        setShowForm(true)
        setTimeout(() => {
            input.current.focus()
        }, 50)
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
                    {showForm ? <form onSubmit={handleSubmit}>
                        <CartInput type='text' value={quantity} onChange={({target}) => {
                            if(!/^\d+$/.test(target.value)){
                                return setQuantity('')
                            }
                            setQuantity(target.value)
                        }} onBlur={() => setShowForm(false)} ref={input}/>
                        </form> :
                    <div style={{cursor: 'default'}} onClick={handleShowForm}>{item.quantity}</div>}
                    <div onClick={() => handleUpdate(item.quantity + 1)}>+</div>
                </CartQuantity>
            </CartInfo>
            <SvgTrash size={25} style={{alignSelf: 'flex-start', cursor: 'pointer'}} onClick={() => removeFromCart(item.id)}/>
            {sideLoading && <SideLoading/>}
        </CartContent>
    )
}

export default CartItem
