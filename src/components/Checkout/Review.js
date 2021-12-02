import React from 'react'
import { ItemTitle, ProductDescription } from '../Products/styles'
import { ReviewItem } from './styles'

const Review = ({checkoutToken}) => {
    return (
        <div style={{borderBottom: '1px solid #cdcdcd', marginBottom: '20px'}}>
            <h3>Resumo do pedido</h3>
            {checkoutToken.live.line_items.map((product => (
                <ReviewItem key={product.id}>
                    <div>
                        <ItemTitle>{product.name}</ItemTitle>
                        <ProductDescription>Quantidade: {product.quantity}</ProductDescription>
                    </div>
                    <ProductDescription>{product.line_total.formatted_with_symbol}</ProductDescription>
                </ReviewItem>
            )))}
            <h3>Total: <span style={{fontWeight: 'normal'}}>{checkoutToken.live.subtotal.formatted_with_symbol}</span></h3>
        </div>
    )
}

export default Review
