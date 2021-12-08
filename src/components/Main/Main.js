import React from 'react'
import { MainStyle } from './styles'
import ProductsGrid from '../Products/ProductsGrid'
import { Routes, Route } from 'react-router'
import { GlobalContext } from '../GlobalContext'
import Product from '../Products/Product'
import { Cart, Checkout } from '..'

const Main = ({children}) => {
    const {products, fetchProducts, categories, setSideCart} = React.useContext(GlobalContext)

    React.useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    return (
        <MainStyle>
            <Routes>
                <Route path='/' element={<ProductsGrid products={products}/>} />
                {categories.map(category => {
                    const categProducts = products.filter(product => product.categories[0].name === category.name)
                    return <Route key={category.id} path={`/${category.slug}`} element={<ProductsGrid products={categProducts} category={category.name}/>}/>
                })}
                <Route path='/product/:id' element={<Product/>}/>
                <Route path='/checkout' element={<Checkout/>}/>
                <Route path='/cart' element={<Cart setSideCart={setSideCart}/>}/>
            </Routes>
            {children}
        </MainStyle>
    )
}

export default Main


//<Route path={`/${category.name}`} element={<ProductsGrid/>}/>