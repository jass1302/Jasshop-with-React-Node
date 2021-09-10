import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'

export default function PaymentScreen(props) {
    const [PaymentMethod, setPaymentMethod] = useState('Paypal');
    const dispatch = useDispatch();

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    if (!userInfo) { props.history.push('/'); }

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress.Address) {
        props.history.push('/shipping');
    }
    const submitHandler = (e) => {
        e.preventDefault();
        // Dispatch
        dispatch(savePaymentMethod(PaymentMethod));
        props.history.push('/placeorder');
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Opciones de pago</h1>
                </div>
                <div>
                    <div>
                        <input type="radio" id="paypal" value="Paypal" name="paymentMethod" required checked
                            onChange={(e) => setPaymentMethod(e.target.value)}></input>
                        <label htmlFor="paypal">PayPal</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio" id="pay2" value="Pay2" name="paymentMethod" required
                            onChange={(e) => setPaymentMethod(e.target.value)}></input>
                        <label htmlFor="pay2">Tarjeta de crédito / débito</label>
                    </div>
                </div>
                <div>
                    <button type="submit" className="primary">Continuar</button>
                </div>
            </form>
        </div>
    )
}
