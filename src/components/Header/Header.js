import React from 'react'
import { HeaderStyle, TopHeader, BottomHeader, Logo, SubMenu } from './styles'
import { SideCart } from '..'
import { SvgCart, SvgX } from '../../assets'
import { GlobalContext } from '../GlobalContext'
import { Link, NavLink } from 'react-router-dom'
import SvgToggle from '../../assets/SvgToggle'
import SideMenu from './SideMenu'


const Header = () => {
    const [scrolled, setScrolled] = React.useState(false)
    const [sideMenu, setSideMenu] = React.useState(false)
    const [closeAnim, setCloseAnim] = React.useState(false)
    const [subMenu, setSubMenu] = React.useState(false)
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

    function handleToggle(){
        if(!sideMenu){
            setCloseAnim(false)
            return setSideMenu(true)
        }
        setCloseAnim(true)
        setTimeout(() => {
            setSideMenu(false)
        }, 500)
    }

    return (
        <HeaderStyle scrolled={scrolled}>
            <TopHeader>
                <Logo><Link to='/'>E-Commerce</Link></Logo>
                <SvgCart counter={cart.total_items} onClick={() => setSideCart(!sideCart)}/>
                <SvgToggle onClick={handleToggle}/>
                {scrolled && <div
                    onClick={() => {
                        window.removeEventListener('scroll', handleScroll)
                        setScrolled(false)
                    }}><SvgX color='gray' size='25px' /></div>}
            </TopHeader>
            <BottomHeader scrolled={scrolled}>
            <NavLink to='/'>Home</NavLink>
                {categories.slice(0, 4).map(category => 
                    category.products > 0 && <NavLink key={category.id} to={`/${category.slug}`}>{category.name}</NavLink>
                )}
            {categories.length > 5 && <SubMenu onMouseEnter={() => setSubMenu(true)} onMouseLeave={() => setSubMenu(false)} onClick={() => setSubMenu(!subMenu)}>
                Mais
                {subMenu && <div>
                    {categories.slice(4).map(category => 
                        category.products > 0 && <NavLink to={`/${category.slug}`}>{category.name}</NavLink> 
                    )}
                </div>}
            </SubMenu>}
            </BottomHeader>
            {sideMenu && <SideMenu closeAnim={closeAnim} handleToggle={handleToggle} categories={categories}/>}
            {sideCart && <SideCart setSideCart={setSideCart} cart={cart}/>}
        </HeaderStyle>
    )
}

export default Header