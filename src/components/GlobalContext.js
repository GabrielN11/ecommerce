import React from 'react'
import { commerce } from '../lib/commerce'
import useAlert from '../hooks/useAlert';

export const GlobalContext = React.createContext()

export const GlobalProvider = ({ children }) => {
    const [products, setProducts] = React.useState([])
    const [cart, setCart] = React.useState({})
    const [categories, setCategories] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [sideLoading, setSideLoading] = React.useState(false)
    const [sideCart, setSideCart] = React.useState(false)
    const [order, setOrder] = React.useState({})


    const {alert, displayAlert} = useAlert()

    const getCategories = React.useCallback(async () => {
        const {data} = await commerce.categories.list()
        setCategories(data)
    }, [])

    const handleAddToCart = React.useCallback(async (productId, quantity, name) => {
        const item = await commerce.cart.add(productId, quantity)
        setCart(item.cart)
        displayAlert(`${name} adicionado ao carrinho!`, 'success')
        setSideCart(true)
    }, [displayAlert])

    const handleUpdateCart = async (productId, quantity) => {
        setSideLoading(true)
        const item = await commerce.cart.update(productId, {quantity})
        setCart(item.cart)
        setSideLoading(false)
    }

    const removeFromCart = async (productId) => {
        setSideLoading(true)
        const item = await commerce.cart.remove(productId)
        setCart(item.cart)
        setSideLoading(false)
    }

    const emptyCart = async () => {
        setSideLoading(true)
        const item = await commerce.cart.empty()
        setCart(item.cart)
        setSideLoading(false)
        displayAlert('O carrinho foi esvaziado.', '', 3000)
    }

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try{
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
            setOrder(incomingOrder)
            refreshCart()
        }catch(error){
            displayAlert(error.data.error.message, 'danger', 10000)
        }
    }

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh()
        setCart(newCart)
    }

    const fetchProducts = React.useCallback(async () => {
        setLoading(true)
        const { data } = await commerce.products.list()
        setProducts(data)
        setLoading(false)
        return data
    }, [])

    const fetchCart = React.useCallback(async () => {
        const cart = await commerce.cart.retrieve()
        setCart(cart)
    }, [])

    return (
        <GlobalContext.Provider value={{
            getCategories, categories, cart, setCart, products, setProducts, handleAddToCart, fetchCart, fetchProducts,
            loading, setLoading, alert, displayAlert, sideCart, setSideCart, handleUpdateCart,
            removeFromCart, emptyCart, setSideLoading, sideLoading, handleCaptureCheckout, order
        }}>
            {children}
        </GlobalContext.Provider>
    )
}