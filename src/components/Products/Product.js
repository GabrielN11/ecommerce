import React from 'react'
import { useNavigate } from 'react-router'
import { GlobalContext } from '../GlobalContext'
import { AddCart, Item, ProdImg, ProdPrice, ProdTitle } from './styles'

const Product = ({product}) => {
    const {handleAddToCart} = React.useContext(GlobalContext)
    const navigate = useNavigate()

    function handleClick() {
        handleAddToCart(product.id, 1, product.name)
    }

    return (
        <Item>
            <ProdImg src={product.image.url} alt={product.name}/>
            <ProdTitle>{product.name}</ProdTitle>
            <ProdPrice>Preço: {product.price.formatted_with_symbol}</ProdPrice>
            <AddCart onClick={handleClick}>Comprar</AddCart>
        </Item>
    )
}

export default Product
