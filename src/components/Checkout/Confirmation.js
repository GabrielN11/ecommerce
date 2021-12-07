import React from 'react'
import { CartButton } from '../Cart/styles'
import { Link } from 'react-router-dom'
import { Spin } from '../Loading/styles'
import { ItemTitle} from '../Products/styles'

const Confirmation = ({order, error, finished /*finished is a test state only*/}) => {
    
    if(!order.customer && !finished) return (
        <div style={{margin: 'auto 0'}}>
            <Spin size={50}/>
        </div>
    )
    if(order.customer || finished) return (
        <div style={{textAlign: 'center', marginTop: '25px'}}>
            <ItemTitle>Pedido enviado! Obrigado pela sua preferência {order.customer ? order.customer.firstname : 'Usuário de teste'}!</ItemTitle>
            <p>Código do pedido: {order.customer_reference ? order.customer_reference : '123456789'}</p>
            <Link to='/'><CartButton color='#0071DC' size={30}>Concluir</CartButton></Link>
        </div>
    )
    if(error) return (
        <div style={{textAlign: 'center', marginTop: '25px'}}>
            <ItemTitle>Ops... Ocorreu algum erro durante o processamento do pedido.</ItemTitle>
            <p>Código do erro: {error}</p>
            <Link to='/'><CartButton color='#6c757d' size={30}>Voltar para página inicial</CartButton></Link>
        </div>
    )
}

export default Confirmation
