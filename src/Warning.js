import React from 'react'
import styled from 'styled-components'
import { CartButton } from './components/Cart/styles'

const WarningDiv = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    min-width: 100vw;
    min-height: 100vh;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
`

const WarningWindow = styled.div`
    width: 290px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
`

const Warning = () => {
    const [warning, setWarning] = React.useState(true)
    if(!warning) return null
    return (
        <WarningDiv>
            <WarningWindow>
                <p>Atenção! Este site é fictício e não vende produtos reais! todos os produtos listados são apenas para testes de desenvolvimento.</p>
                <CartButton color='grey' size={30} onClick={() => setWarning(false)}>Entendi</CartButton>
            </WarningWindow>
        </WarningDiv>
    )
}

export default Warning
