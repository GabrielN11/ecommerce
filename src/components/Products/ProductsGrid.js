import React from 'react'
import { useLocation } from 'react-router'
import ProductItem from './ProductItem'
import { Empty, Grid } from './styles'

const ProductsGrid = ({products}) => {

    const [filterProducts, setFilterProducts] = React.useState([])
    const location = useLocation()

    React.useEffect(() => {
        const search = new URLSearchParams(location.search).get('q')
        if(search){
            const result = products.filter(product => {
                return product.name.toLowerCase().includes(search) || 
                product.description.toLowerCase().includes(search) || 
                product.categories[0].name.toLowerCase().includes(search)
            })
            setFilterProducts(result)
        }

        return () => {
            setFilterProducts([])
        }
    }, [location, products])

    if(products.length === 0) return (
        <Empty>
            <div>
                <h3>Ops! Não parece haver produtos aqui...</h3>
            </div>
        </Empty>
    )
    return (
        <Grid>
            {filterProducts.length===0 && products.map(product => (
                <ProductItem key={product.id} product={product}/>
            ))}
            {filterProducts.length > 0 && filterProducts.map(product =>(
                <ProductItem key={product.id} product={product}/>
            ))}
        </Grid>
    )
}

export default ProductsGrid
