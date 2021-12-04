import React from 'react'
import { useLocation } from 'react-router'
import { Head } from '..'
import ProductItem from './ProductItem'
import { Empty, Grid } from './styles'

const ProductsGrid = ({ products, category }) => {

    const [filterProducts, setFilterProducts] = React.useState({status: false, content: []})
    const location = useLocation()

    React.useEffect(() => {
        const search = new URLSearchParams(location.search).get('q')
        if (search) {
            const result = products.filter(product => {
                return product.name.toLowerCase().includes(search) ||
                    product.description.toLowerCase().includes(search) ||
                    product.categories[0].name.toLowerCase().includes(search)
            })
            setFilterProducts({status: true, content: result})
        }

        return () => {
            setFilterProducts({status: false, content: []})
        }
    }, [location, products])

    if (products.length === 0) return (
        <Empty>
            <div>
                <h3>Ops! Não parece haver produtos aqui...</h3>
            </div>
        </Empty>
    )
    return (
        <Grid>
            {!filterProducts.status && products.map(product => (
                <React.Fragment key={product.id}>
                    <Head description={!category ? 'Loja de produtos variados, entregamos produtos em todo o Brasil.' :
                     `Compre ${category} pelos menores preços, entregas em todo Brasil.`}
                     title={category ? category : 'E-commerce'}/>
                    <ProductItem product={product} />
                </React.Fragment>
            ))}
            {filterProducts.status && (filterProducts.content.length > 0 ? filterProducts.content.map(product => (
                <React.Fragment key={product.id}>
                    <Head description='Loja de produtos variados, entregamos produtos em todo o Brasil.' title={`Pesquisa - ${new URLSearchParams(location.search).get('q')}`}/>
                    <ProductItem key={product.id} product={product} />
                </React.Fragment>
            )) : <Empty>Não há resultados para sua pesquisa.</Empty>)}
        </Grid>
    )
}

export default ProductsGrid
