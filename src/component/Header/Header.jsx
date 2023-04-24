import React, { useContext } from 'react';
import logo from '../../../images/Logo.svg'
import './Header.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
const Header = () => {

  const {user,logOut} = useContext(AuthContext)
  const handleLogOut = () =>{
    logOut()
  }
    return (
        <div className='header'>
            <img src={logo} alt="logo" />

          <nav>
          <Link to="/">Shop</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/inventory">Inventory</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
            {user && <span className='text-yellow'>Welcome {user.email} <button onClick={handleLogOut}>Sign out</button></span>}
            
          </nav>
         
        </div>
    );
};

export default Header;