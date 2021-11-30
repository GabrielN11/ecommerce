import React from 'react'
import { MainStyle } from './styles'
import { useMediaQuery } from 'react-responsive'
import ProductsGrid from '../Products/ProductsGrid'
import { Routes, Route } from 'react-router'
import { GlobalContext } from '../GlobalContext'

const Main = ({children}) => {
    const mediaQuery = useMediaQuery({query: '(max-width: 800px)'})
    const {products, fetchProducts, categories} = React.useContext(GlobalContext)

    React.useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    return (
        <MainStyle mediaQuery={mediaQuery}>
            <Routes>
                <Route path='/' element={<ProductsGrid products={products}/>} />
                {categories.map(category => {
                    const categProducts = products.filter(product => product.categories[0].name === category.name)
                    return <Route key={category.id} path={`/${category.slug}`} element={<ProductsGrid products={categProducts}/>}/>
                })}
            </Routes>
            {children}
        </MainStyle>
    )
}

export default Main


//<Route path={`/${category.name}`} element={<ProductsGrid/>}/>