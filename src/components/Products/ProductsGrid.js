import React from 'react'
import Product from './Product'
import { Empty, Grid } from './styles'

const ProductsGrid = ({products}) => {

    if(products.length === 0) return (
        <Empty>
            <div>
                <h3>Ops! Não parece haver produtos aqui...</h3>
            </div>
        </Empty>
    )
    return (
        <Grid>
            {products.map(product => (
                <Product key={product.id} product={product}/>
            ))}
        </Grid>
    )
}

export default ProductsGrid
