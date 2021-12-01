import React from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../GlobalContext'
import { AddCart, Item, ItemImg, ItemPrice, ItemTitle } from './styles'

const ProductItem = ({product}) => {
    const {handleAddToCart} = React.useContext(GlobalContext)

    function handleClick() {
        handleAddToCart(product.id, 1, product.name)
    }

    return (
        <Item>
            <ItemImg src={product.image.url} alt={product.name}/>
            <ItemTitle><Link to={`/product/${product.permalink}`}>{product.name}</Link></ItemTitle>
            <ItemPrice>Preço: {product.price.formatted_with_symbol}</ItemPrice>
            <AddCart onClick={handleClick}>Comprar</AddCart>
        </Item>
    )
}

export default ProductItem
