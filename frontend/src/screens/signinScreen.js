import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { signinAction } from '../actions/userActions';

function SigninScreen(props) {
    
    const dispatch = useDispatch();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const redirect = props.location.search? props.location.search.split('=')[1]: '/';

    const userSignin = useSelector((state)=> state.userSignin);
    const {userInfo} = userSignin;
    
    const submitHandler = (e) =>{
        e.preventDefault();
        // Signin Action
        dispatch(signinAction(email, password));
    };
    // Redirect
    useEffect(() =>{
            if(userInfo){
                props.history.push(redirect);
            }
        },[props.history, redirect, userInfo]);
    
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Iniciar Sesión</h1>
                </div>
                <div>
                    <label htmlFor="email">Correo Electrónico</label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="Ingresa su correo electrónico"
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="pass">Contraseña</label>
                    <input 
                        type="password" 
                        id="pass" 
                        placeholder="Ingresa tu contraseña"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="">
                        <button className="primary" type="submit">Ingresar</button>
                    </label>
                </div>
                <div>
                    <label htmlFor="">
                        <div>
                            ¿No tienes cuenta? {' '}
                            <Link to="/register">¡Crea una!</Link>
                        </div>
                    </label>
                </div>
            </form>
        </div>
    );
}

export default SigninScreen;