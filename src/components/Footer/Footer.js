import React from 'react'
import SvgCode from '../../assets/SvgCode'
import { FooterStyle, FooterLink } from './styles'

const Footer = () => {
    return (
        <FooterStyle>
            <FooterLink href='https://gabrielnunes.vercel.app' target='_blank'>
                <SvgCode style={{marginRight: '5px'}}/>Desenvolvido por Gabriel Nunes
            </FooterLink>
        </FooterStyle>
    )
}

export default Footer
