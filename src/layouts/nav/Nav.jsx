import React from 'react'
import { NavLink } from 'react-router-dom'
import './nav.css';
const nav = () => {
  return (
    <div className='nav'>
        <ul  >
            <li><NavLink to={'/'}>Home</NavLink></li>
            <li><NavLink to={'/products'}>Product List</NavLink></li>
            <li><NavLink to={'/categories'}>Categories</NavLink></li>
            <li><NavLink to={'/about'}>About Us</NavLink></li>
            <li><NavLink to={'/contact'}>Contact Us</NavLink></li>

            {/* <li><NavLink to={'/d'}>ffdfdf</NavLink> </li> */}
        </ul>
    </div>
  )
}

export default nav