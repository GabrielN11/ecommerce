import React from 'react'
import { GlobalContext } from '../GlobalContext'
import Product from './Product'
import { Grid } from './styles'

const ProductsGrid = () => {
    const {products, fetchProducts} = React.useContext(GlobalContext)

    React.useEffect(() => {
        fetchProducts()
    }, [fetchProducts])
    return (
        <Grid>
            {products.map(product => (
                <Product key={product.id} product={product}/>
            ))}
        </Grid>
    )
}

export default ProductsGrid
