import React from 'react'
import { SvgX } from '../../assets'
import { SideMenuStyle } from './styles'
import { NavLink } from 'react-router-dom'
import SearchBar from './SearchBar'

const SideMenu = ({closeAnim, handleToggle, categories}) => {
    return (
        <SideMenuStyle closeAnim={closeAnim}>
            <SvgX size={30} style={{margin: '10px', cursor: 'pointer'}} onClick={handleToggle}/>
            <SearchBar color='#444' mobile={true} handleToggle={handleToggle}/>
            <NavLink to='/' style={{borderTop: '1px solid #cdcdcd', marginTop: '15px'}} onClick={handleToggle}>Home</NavLink>
            {categories.map(category => 
                category.products > 0 && <NavLink key={category.id} to={`/${category.slug}`} onClick={handleToggle}>{category.name}</NavLink>
            )}
        </SideMenuStyle>
    )
}

export default SideMenu
