import React from 'react'
import { HeaderStyle, TopHeader, BottomHeader, Logo } from './styles'
import { SideCart } from '..'
import { SvgCart, SvgX } from '../../assets'
import { GlobalContext } from '../GlobalContext'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
    const [scrolled, setScrolled] = React.useState(false)
    const {cart, sideCart, setSideCart, categories} = React.useContext(GlobalContext)
    const handleScroll = React.useCallback(() => {
        if (window.scrollY > 120)
            return setScrolled(true)
        setScrolled(false)
    }, [])

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [handleScroll])

    return (
        <HeaderStyle scrolled={scrolled}>
            <TopHeader>
                <Logo><Link to='/'>E-Commerce</Link></Logo>
                <SvgCart counter={cart.total_items} onClick={() => setSideCart(!sideCart)}/>
                {scrolled && <div
                    onClick={() => {
                        window.removeEventListener('scroll', handleScroll)
                        setScrolled(false)
                    }}><SvgX color='gray' size='25px' /></div>}
            </TopHeader>
            <BottomHeader scrolled={scrolled}>
            <NavLink to='/'>Home</NavLink>
                {categories.map(category => 
                    category.products > 0 && <NavLink key={category.id} to={`/${category.slug}`}>{category.name}</NavLink>
                )}
            </BottomHeader>
            {sideCart && <SideCart setSideCart={setSideCart} cart={cart}/>}
        </HeaderStyle>
    )
}

export default Header
