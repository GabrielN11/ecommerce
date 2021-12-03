import React from 'react'
import SvgGithub from '../../assets/SvgGithub'
import { FooterStyle, FooterLink } from './styles'

const Footer = () => {
    return (
        <FooterStyle>
            <FooterLink href='https://github.com/GabrielN11' target='_blank'>
                <SvgGithub/> Desenvolvido por Gabriel Nunes
            </FooterLink>
        </FooterStyle>
    )
}

export default Footer
