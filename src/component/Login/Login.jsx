import React, { useContext, useState } from 'react';
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const Login = () => {

    const {signIn} = useContext(AuthContext);

    const [show, setShow] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/' ;


    const handleSignIn = (event) =>{
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email,password)
        .then(result =>{
            const loggedUser = result.user;
            form.reset();
            navigate(from, {replace: true});

        })
        .catch(error =>{
            console.log(error)
        })
       

    }



    return (
        <div className='form-container'>
            <h3 className='form-title'>Login</h3>

        <form onSubmit={handleSignIn}>
            <div className='form-control'>
                <label htmlFor="">Email</label>
                <input type="email" name="email" id="" required/>
            </div>
            <div className='form-control'>
                <label htmlFor="password">Password</label>
                <input type={show? "text" : "password"} name="password" id="" required/>
                <p onClick={() => setShow(!show)}>
                {show ? <span>Hide password</span>: <span>Show Password</span>}
                </p>
            </div>

            <input className='btn-submit' type="submit" value="Login" />
        </form>

        <p className='form-link'><span>New to Ema-John?<Link to='/signup'>Create New Account</Link></span></p>




        </div>
    );
};

export default Login;