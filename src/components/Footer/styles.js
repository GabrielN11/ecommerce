import styled from "styled-components";

export const FooterStyle = styled.footer`
    grid-area: footer;
    background-color: #191818;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 50px;
    @media(max-width: 600px){
        padding: 0;
        justify-content: center;
    }
`

export const FooterLink = styled.a`
    margin: 0;
    color: #bbb;
    text-decoration: none;
    transition: opacity .4s;
    &:hover{
        opacity: 0.6;
    }
`