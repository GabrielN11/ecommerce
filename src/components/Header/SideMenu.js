import React from 'react'
import { SvgX } from '../../assets'
import { SideMenuStyle } from './styles'
import { NavLink } from 'react-router-dom'

const SideMenu = ({closeAnim, handleToggle, categories}) => {
    return (
        <SideMenuStyle closeAnim={closeAnim}>
            <SvgX size={30} style={{margin: '10px', cursor: 'pointer'}} onClick={handleToggle}/>
            <NavLink to='/' style={{borderTop: '1px solid #cdcdcd'}}>Home</NavLink>
            {categories.map(category => 
                category.products > 0 && <NavLink key={category.id} to={`/${category.slug}`}>{category.name}</NavLink>
            )}
        </SideMenuStyle>
    )
}

export default SideMenu
