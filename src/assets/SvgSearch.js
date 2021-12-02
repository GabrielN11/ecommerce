import React from 'react'
import styled from 'styled-components'

export const Search = styled.svg`
    margin-right: 15px;
    cursor: pointer;
    transition: transform .4s;
    @media(max-width: 600px){
        display: ${({mobile}) => mobile ? 'block' : 'none'};
    }
    &:hover{
        transform: scale(1.15)
    }
`

const SvgSearch = ({color = '#fff', size = '20', mobile, ...props}) => {
    return (
        <Search xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} viewBox="0 0 16 16" {...props} mobile={mobile}>
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </Search>
    )
}

export default SvgSearch
