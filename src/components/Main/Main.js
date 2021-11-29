import React from 'react'
import { MainStyle } from './styles'
import { useMediaQuery } from 'react-responsive'
import ProductsGrid from '../Products/ProductsGrid'
import { Routes, Route } from 'react-router'

const Main = ({children}) => {
    const mediaQuery = useMediaQuery({query: '(max-width: 800px)'})
    return (
        <MainStyle mediaQuery={mediaQuery}>
            <Routes>
                <Route path='/' element={<ProductsGrid/>} />
            </Routes>
            {children}
        </MainStyle>
    )
}

export default Main
