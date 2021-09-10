import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerAction } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function RegisterScreen(props) {

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const userRegister = useSelector((state) => state.userSignup);
    const { userInfo, loading, error } = userRegister;

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== ConfirmPassword) {
            alert('Passwords dont match');
        } else {
            // Register Action
            dispatch(registerAction(name, email, password));
        }
    };
    // Redirect
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Registrar usuario</h1>
                </div>
                <div>
                    <label htmlFor="email">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Ingresa tu nombre"
                        onChange={e => setName(e.target.value)}
                    />
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
                    <label htmlFor="confirmPass">Confirmar Contraseña</label>
                    <input
                        type="password"
                        id="confirmPass"
                        placeholder="Confirma tu contraseña"
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="">
                        <button className="primary" type="submit">Registrar</button>
                    </label>
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                </div>
                <div>
                    <label htmlFor="">
                        <div>
                            Si ya tienes cuenta, {' '}
                            <Link to={`/signin?redirect=${redirect}`}>¡Inicia sesión aquí!</Link>
                        </div>
                    </label>
                </div>
            </form>
        </div>
    );
}

export default RegisterScreen;