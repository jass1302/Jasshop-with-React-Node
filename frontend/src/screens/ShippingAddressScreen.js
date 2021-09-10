import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'

export default function ShippingAddressScreen(props) {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if (!userInfo) { props.history.push('/signin'); }
    const { cartItems } = cart;
    if (cartItems.length === 0) { props.history.push('/'); }

    // Hooks
    const [FullName, setFullName] = useState(shippingAddress.FullName);
    const [Address, setAddress] = useState(shippingAddress.Address);
    const [City, setCity] = useState(shippingAddress.City);
    const [CP, setCP] = useState(shippingAddress.CP);
    const [Country, setCountry] = useState(shippingAddress.Country);
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault(); // 
        // Dispatch save shipping
        dispatch(saveShippingAddress({ FullName, Address, City, CP, Country }));
        props.history.push('/payment');
    }
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Dirección de entrega</h1>
                </div>
                <div>
                    <label htmlFor="fullname">Nombre completo</label>
                    <input
                        type="text"
                        id="fullname"
                        placeholder="Nombre completo"
                        value={FullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="address">Dirección de entrega</label>
                    <input
                        type="text"
                        id="address"
                        placeholder="Dirección de entrega"
                        value={Address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="city">Ciudad</label>
                    <input
                        type="text"
                        id="city"
                        placeholder="Ciudad"
                        value={City}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="cp">Código Postal</label>
                    <input
                        type="text"
                        id="cp"
                        placeholder="Código postal"
                        value={CP}
                        onChange={(e) => setCP(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="country">País</label>
                    <input
                        type="text"
                        id="country"
                        placeholder="País"
                        value={Country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    ></input>
                </div>
                <div> <label />
                    <button className="primary" type="submit">Continuar</button>
                </div>
            </form >
        </div >
    )
}
