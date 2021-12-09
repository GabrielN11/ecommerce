import React from 'react'
import { Link } from 'react-router-dom'
import { NotFoundContainer, NotFoundDescription, NotFoundTitle } from './styles'

const NotFound = () => {
    return (
        <NotFoundContainer>
            <NotFoundTitle>404</NotFoundTitle>
            <NotFoundDescription>Essa página não existe. <Link to='/'>Clique aqui</Link> para ir até a pagina inicial.</NotFoundDescription>
        </NotFoundContainer>
    )
}

export default NotFound
