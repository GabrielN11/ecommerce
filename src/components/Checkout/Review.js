import React from 'react'
import { ItemTitle, ProductDescription } from '../Products/styles'
import { ReviewItem, ReviewDiv } from './styles'

const Review = ({ data, discount, discountCode }) => {
   
    return (
        <ReviewDiv>
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
            {!discount.valid && <h3>Subtotal (Sem frete): <span>{data.live.subtotal.formatted_with_symbol}</span></h3>}
            {discount.valid && <h3>Subtotal (Sem frete): <span>
                de <span style={{textDecoration: 'line-through'}}>{discount.live.subtotal.formatted_with_symbol}</span> por {discount.live.total.formatted_with_symbol}
            </span>
            </h3>}
            {discount.valid && <p>Cupom '{discount.code}' aceito! Parabéns pelo desconto!</p>}
            {!discount.valid && discountCode.length > 0 ? <p style={{color: '#dc3545'}}>Código de cupom inválido.</p> : null}
            <h3>Total: <span>{data.live.total.formatted_with_symbol}</span></h3>
        </ReviewDiv>
    )
}

export default Review
