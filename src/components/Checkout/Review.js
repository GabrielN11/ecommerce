import React from 'react'
import { ItemTitle, ProductDescription } from '../Products/styles'
import { ReviewItem, ReviewDiv } from './styles'

const Review = ({ data, discountCode, discountError }) => {
   
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
            {Object.entries(data.live.discount).length === 0 || data.live.discount.product_ids.length === 0 ? <h3>Subtotal (Sem frete): <span>{data.live.subtotal.formatted_with_symbol}</span></h3> : null}
            {Object.entries(data.live.discount).length > 0 &&  data.live.discount.product_ids.length > 0 ? <h3>Subtotal (Sem frete): <span>
                de <span style={{textDecoration: 'line-through'}}>{data.live.subtotal.formatted_with_symbol}</span> por {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.live.subtotal.raw - data.live.discount.amount_saved.raw).replace(/\s+/g, '')}
            </span>
            </h3> : null}
            {Object.entries(data.live.discount).length > 0 && !discountError && data.live.discount.product_ids.length > 0 ? <p>Parabéns! Cupom '{data.live.discount.code}' aceito! Desconto de {data.live.discount.amount_saved.formatted_with_symbol}.</p> : null}
            {Object.entries(data.live.discount).length === 0 && discountCode.length > 0 && !discountError ? <p style={{color: '#dc3545'}}>Código de cupom inválido.</p> : null}
            {discountError && <p style={{color: '#dc3545'}}>Ocorreu um erro para processar o seu cupom de desconto. Tente novamente.</p>}
            <h3>Total: <span>{data.live.total.formatted_with_symbol}</span></h3>
        </ReviewDiv>
    )
}

export default Review
