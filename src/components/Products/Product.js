import React from 'react'
import { useParams } from 'react-router'
import { Head } from '..'
import SvgArrow from '../../assets/SvgArrow'
import { CartInput, CartQuantity } from '../Cart/styles'
import { GlobalContext } from '../GlobalContext'
import SideLoading from '../Loading/SideLoading'
import { ProductImg, ImageContainer, ProductMainWindow, ProductInfoContainer, ProductTitle, ProductPrice, ProductDescription, ProductButton } from './styles'

const Product = () => {

    const [product, setProduct] = React.useState(null)
    const [index, setIndex] = React.useState(0)
    const [images, setImages] = React.useState(null)
    const [showForm, setShowForm] = React.useState(false)
    const [quantity, setQuantity] = React.useState(1)
    const [price, setPrice] = React.useState('')
    const {fetchProducts, displayAlert, handleAddToCart, setSideLoading, sideLoading} = React.useContext(GlobalContext)
    const {id} = useParams()
    const input = React.useRef()

    React.useEffect(() => {
        const fetchProduct = async () => {
            const prods = await fetchProducts()
            prods.forEach(item => {
                if(item.permalink === id) {
                    setProduct(item)
                    setPrice(item.price.formatted_with_symbol)
                    setImages(item.assets)
                    const desc = document.querySelector('#desc')
                    if(desc) desc.innerHTML = item.description
                }
            })
        }
        fetchProduct()

    }, [fetchProducts, id])

    React.useEffect(() => {
        if(product){
            const newRawPrice = product.price.raw * quantity
            const newPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                .format(newRawPrice)
                .replace(/\s+/g, '')
            setPrice(newPrice)
        }
    }, [quantity, product])

    function nextImage(){
        setSideLoading(true)
        setIndex((index + 1) % images.length)
    }

    function prevImage(){
        setSideLoading(true)
        if(index > 0)
        setIndex(index - 1)
        else
        setIndex(images.length - 1)
    }

    function handleSubmit(e){
        e.preventDefault()
        if(quantity === '' || quantity < 1) setQuantity(1)
        if(quantity > product.inventory.available){
            setQuantity(1)
            displayAlert(`H?? somente ${product.inventory.available} produtos dispon??veis no momento.`, 'warning')
        }
        input.current.blur()
    }

    return (
        <ProductMainWindow>
            {product && <>
                <Head title={product.name} description={`Compre ${product.name} por pre??os baixos na loja E-commerce`}/>
                <ImageContainer>
                {product.assets.length > 1 && <SvgArrow size={30} onClick={prevImage}/>}
                {product && images && <ProductImg src={images[index].url} onLoad={() => setSideLoading(false)}/>} 
                {product.assets.length > 1 && <SvgArrow reverse size={30} onClick={nextImage}/>}
            </ImageContainer>
            {product && <ProductInfoContainer direction='column'>
                <ProductTitle>{product.name}</ProductTitle>
                <ProductPrice>{price}</ProductPrice>
                <ProductDescription id='desc'></ProductDescription>
                <ProductDescription style={{color: '#555'}}>Dispon??veis: {product.inventory.available}</ProductDescription>
                <CartQuantity style={{width: '175px'}}>
                    <div style={{padding: '5px 0'}} onClick={() => {
                        if(quantity - 1 < 1) return
                        setQuantity(quantity - 1)
                    }}>-</div>
                    {!showForm ? <div style={{padding: '5px 0'}} onClick={() => {
                        setShowForm(true)
                        setTimeout(() => {
                            input.current.focus()
                        }, 50)
                    }}>{quantity}</div> : 
                        <form onSubmit={handleSubmit}>
                            <CartInput type='text' value={quantity} onChange={({target}) => {
                            if(!/^\d+$/.test(target.value)){
                                return setQuantity('')
                            }
                            setQuantity(target.value)
                        }} onBlur={() => setShowForm(false)} ref={input} style={{height: '100%'}}/>
                        </form>
                    }
                    <div style={{padding: '5px 0'}} onClick={() => {
                        if(quantity + 1 > product.inventory.available) return displayAlert(`H?? somente ${product.inventory.available} produtos dispon??veis no momento.`, 'warning')
                        setQuantity(quantity + 1)
                    }}>+</div>
                </CartQuantity>
                <ProductButton onClick={() => handleAddToCart(product.id, quantity, product.name)}>Adicionar ao Carrinho</ProductButton>
            </ProductInfoContainer>}
            </>}
            {sideLoading && <SideLoading/>}
        </ProductMainWindow>
    )
}

export default Product
