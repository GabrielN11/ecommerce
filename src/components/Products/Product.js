import React from 'react'
import { useParams } from 'react-router'
import { Head } from '..'
import SvgArrow from '../../assets/SvgArrow'
import { CartInput, CartQuantity } from '../Cart/styles'
import { GlobalContext } from '../GlobalContext'
import { ProductImg, ImageContainer, ProductMainWindow, ProductInfoContainer, ProductTitle, ProductPrice, ProductDescription, ProductButton } from './styles'

const Product = () => {

    const [product, setProduct] = React.useState(null)
    const [index, setIndex] = React.useState(0)
    const [images, setImages] = React.useState(null)
    const [showForm, setShowForm] = React.useState(false)
    const [quantity, setQuantity] = React.useState(1)
    const {fetchProducts, displayAlert, handleAddToCart} = React.useContext(GlobalContext)
    const {id} = useParams()
    const input = React.useRef()

    React.useEffect(() => {
        const fetchProduct = async () => {
            const prods = await fetchProducts()
            prods.forEach(item => {
                if(item.permalink === id) {
                    setProduct(item)
                    setImages(item.assets)
                    const desc = document.querySelector('#desc')
                    if(desc) desc.innerHTML = item.description
                }
            })
        }
        fetchProduct()

    }, [fetchProducts, id])

    function nextImage(){
        setIndex((index + 1) % images.length)
    }

    function prevImage(){
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
            displayAlert(`Há somente ${product.inventory.available} produtos disponíveis no momento.`, 'warning')
        }
        input.current.blur()
    }

    return (
        <ProductMainWindow>
            {product && <>
                <Head title={product.name} description={`Compre ${product.name} por preços baixos na loja E-commerce`}/>
                <ImageContainer>
                {product.assets.length > 1 && <SvgArrow size={30} onClick={prevImage}/>}
                {product && images && <ProductImg src={images[index].url}/>} 
                {product.assets.length > 1 && <SvgArrow reverse size={30} onClick={nextImage}/>}
            </ImageContainer>
            {product && <ProductInfoContainer direction='column'>
                <ProductTitle>{product.name}</ProductTitle>
                <ProductPrice>{product.price.formatted_with_symbol}</ProductPrice>
                <ProductDescription id='desc'></ProductDescription>
                <ProductDescription style={{color: '#555'}}>Disponíveis: {product.inventory.available}</ProductDescription>
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
                        if(quantity + 1 > product.inventory.available) return displayAlert(`Há somente ${product.inventory.available} produtos disponíveis no momento.`, 'warning')
                        setQuantity(quantity + 1)
                    }}>+</div>
                </CartQuantity>
                <ProductButton onClick={() => handleAddToCart(product.id, quantity, product.name)}>Adicionar ao Carrinho</ProductButton>
            </ProductInfoContainer>}
            </>}
        </ProductMainWindow>
    )
}

export default Product
