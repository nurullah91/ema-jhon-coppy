import React from 'react';
import logo from '../../../images/Logo.svg'
import './Header.css'
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <div className='header'>
            <img src={logo} alt="logo" />

          <nav>
          <Link to="/shop">Shop</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/inventory">Inventory</Link>
            <Link to="/login">Login</Link>
          </nav>
         
        </div>
    );
};

export default Header;