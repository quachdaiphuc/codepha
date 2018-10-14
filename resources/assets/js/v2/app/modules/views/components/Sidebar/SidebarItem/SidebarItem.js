import React from 'react'
import { NavLink } from 'react-router-dom'

const SidebarItem = (props) => (
    <NavLink
        className='main-nav'
        to={props.to}
        activeClassName='active-nav'
    >
        <li>
            {props.children}
        </li>
    </NavLink>
)

export default SidebarItem
