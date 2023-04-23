import React from 'react';
import './Login.css'
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className='form-container'>
            <h3 className='form-title'>Login</h3>

        <form>
            <div className='form-control'>
                <label htmlFor="">Email</label>
                <input type="email" name="email" id="" required/>
            </div>
            <div className='form-control'>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="" required/>
            </div>

            <input className='btn-submit' type="submit" value="Login" />
        </form>

        <p className='form-link'><span>New to Ema-John?<Link to='/signup'>Create New Account</Link></span></p>




        </div>
    );
};

export default Login;