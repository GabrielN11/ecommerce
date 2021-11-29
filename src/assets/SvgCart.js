import React from 'react'
import styled from 'styled-components'

const CartCounter = styled.span`
    display: inline-block;
    border-radius: 50%;
    padding: 2px 5px;
    text-align: center;
    transform: translateY(-15px) translateX(-5px);
    background-color: brown;
    color: #fff;
`

const SvgStyle = styled.div`
    cursor: pointer;
    transition: transform .4s ease;
    &:hover{
        transform: scale(1.15);
    }
`

const SvgCart = ({counter, ...props}) => {
    return (
        <SvgStyle {...props} style={{cursor: 'pointer'}}>
            <svg width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            {counter > 0 && <CartCounter>{counter}</CartCounter>}
        </SvgStyle>
    )
}

export default SvgCart
