import React from 'react'
import { commerce } from '../lib/commerce'
import useAlert from '../hooks/useAlert';

export const GlobalContext = React.createContext()

export const GlobalProvider = ({ children }) => {
    const [products, setProducts] = React.useState([])
    const [cart, setCart] = React.useState({})
    const [loading, setLoading] = React.useState(false)
    const [sideCart, setSideCart] = React.useState(false)

    const {alert, displayAlert} = useAlert()

    const handleAddToCart = React.useCallback(async (productId, quantity, name) => {
        const item = await commerce.cart.add(productId, quantity)
        setCart(item.cart)
        displayAlert(`${name} adicionado ao carrinho!`, 'success')
        setSideCart(true)
    }, [displayAlert])

    const handleUpdateCart = async (productId, quantity) => {
        const item = await commerce.cart.update(productId, {quantity})
        setCart(item.cart)
    }

    const removeFromCart = async (productId) => {
        const item = await commerce.cart.remove(productId)
        setCart(item.cart)
    }

    const fetchProducts = React.useCallback(async () => {
        setLoading(true)
        const { data } = await commerce.products.list()
        setProducts(data)
        setLoading(false)
    }, [])

    const fetchCart = React.useCallback(async () => {
        const cart = await commerce.cart.retrieve()
        setCart(cart)
    }, [])

    console.log(cart)
    return (
        <GlobalContext.Provider value={{
            cart, setCart, products, setProducts, handleAddToCart, fetchCart, fetchProducts,
            loading, setLoading, alert, displayAlert, sideCart, setSideCart, handleUpdateCart,
            removeFromCart
        }}>
            {children}
        </GlobalContext.Provider>
    )
}