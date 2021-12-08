import React from 'react'
import { commerce } from '../lib/commerce'
import useAlert from '../hooks/useAlert';
import Alert from './Alert/Alert';

export const GlobalContext = React.createContext()

export const GlobalProvider = ({ children }) => {
    const [products, setProducts] = React.useState([])
    const [cart, setCart] = React.useState({})
    const [categories, setCategories] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [sideLoading, setSideLoading] = React.useState(false)
    const [sideCart, setCartMenu] = React.useState(false)
    const [discountCode, setDiscountCode] = React.useState('')
    const [order, setOrder] = React.useState({})
    const [error, setError] = React.useState(null)


    const { alert, displayAlert } = useAlert()

    const setSideCart = React.useCallback((status) => {
        setCartMenu(status)
    }, [])

    const getCategories = React.useCallback(async () => {
        try {
            const { data } = await commerce.categories.list()
            const categs = data.filter(item => item.products > 0)
            const finalCategs = []
            categs.reduce((prev, item) => {
                if (item.products >= prev) {
                    finalCategs.unshift(item)
                    return item.products
                }
                finalCategs.push(item)
                return item.products
            }, 0) //Rearranges the array so that categories with more items are shown first 
            setCategories(finalCategs)
        } catch (e) {
            displayAlert('Erro ao listar as categorias. Tente recarregar a página.', 'danger', 7000)
        }
    }, [displayAlert])

    const handleAddToCart = React.useCallback(async (productId, quantity, name) => {
        try {
            const item = await commerce.cart.add(productId, quantity)
            setCart(item.cart)
            displayAlert(`${name} adicionado ao carrinho!`, 'success')
        } catch (e) {
            displayAlert('Erro ao adicionar produto no carrinho. Tente novamente.', 'danger')
        }
    }, [displayAlert])

    const handleUpdateCart = async (productId, quantity) => {
        try {
            setSideLoading(true)
            const item = await commerce.cart.update(productId, { quantity })
            setCart(item.cart)
            setSideLoading(false)
        } catch (e) {
            displayAlert('Erro ao atualizar o carrinho. Tente novamente.', 'danger')
            setSideLoading(false)
        }
    }

    const removeFromCart = async (productId) => {
        try {
            setSideLoading(true)
            const item = await commerce.cart.remove(productId)
            setCart(item.cart)
            setSideLoading(false)
        } catch (e) {
            displayAlert('Erro ao remover produto do carrinho. Tente novamente.', 'danger')
            setSideLoading(false)
        }
    }

    const emptyCart = async () => {
        try {
            setSideLoading(true)
            const item = await commerce.cart.empty()
            setCart(item.cart)
            setSideLoading(false)
            displayAlert('O carrinho foi esvaziado.', '', 3000)
        } catch (e) {
            displayAlert('Erro ao esvaziar o carrinho. Tente novamente.', 'danger')
            setSideLoading(false)
        }
    }

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
            setOrder(incomingOrder)
            refreshCart()
        } catch (error) {
            displayAlert(error.data.error.message, 'danger', 8000)
            setError(error)
        }
    }

    const refreshCart = async () => {
        try {
            const newCart = await commerce.cart.refresh()
            setCart(newCart)
        } catch (e) {
            displayAlert('Erro ao resetar o carrinho.', 'danger', 8000)
        }
    }

    const fetchProducts = React.useCallback(async () => {
        try {
            setLoading(true)
            const { data } = await commerce.products.list()
            setProducts(data)
            setLoading(false)
            return data
        } catch (e) {
            displayAlert('Erro ao listar os produtos. Tente novamente.', 'danger', 8000)
            setLoading(false)
            return
        }
    }, [displayAlert])

    const fetchCart = React.useCallback(async () => {
        const cart = await commerce.cart.retrieve()
        setCart(cart)
    }, [])

    return (
        <GlobalContext.Provider value={{
            getCategories, categories, cart, setCart, products, setProducts, handleAddToCart, fetchCart, fetchProducts,
            loading, setLoading, alert, displayAlert, sideCart, setSideCart, handleUpdateCart,
            removeFromCart, emptyCart, setSideLoading, sideLoading, handleCaptureCheckout, order, error, refreshCart,
            discountCode, setDiscountCode
        }}>
            {children}
            <Alert alert={alert} />
        </GlobalContext.Provider>
    )
}