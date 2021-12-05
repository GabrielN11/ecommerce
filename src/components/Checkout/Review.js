import React from 'react'
import { ItemTitle, ProductDescription } from '../Products/styles'
import { ReviewItem } from './styles'

const Review = ({data}) => {
    return (
        <div style={{borderBottom: '1px solid #cdcdcd', marginBottom: '20px'}}>
            <h3>Resumo do pedido</h3>
            {data.live.line_items.map((product => (
                <ReviewItem key={product.id}>
                    <div>
                        <ItemTitle>{product.name}</ItemTitle>
                        <ProductDescription>Quantidade: {product.quantity}</ProductDescription>
                    </div>
                    <ProductDescription>{product.line_total.formatted_with_symbol}</ProductDescription>
                </ReviewItem>
            )))}
            <h3>Subtotal (Sem frete): <span style={{fontWeight: 'normal'}}>{data.live.subtotal.formatted_with_symbol}</span></h3>
            <h3>Total: <span style={{fontWeight: 'normal'}}>{data.live.total.formatted_with_symbol}</span></h3>
        </div>
    )
}

export default Review
