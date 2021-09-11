import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { placeOrderAction } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps'
import { PLACE_ORDER_RESET } from '../constants/orderConstants';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function PlaceOrderScreen(props) {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    if (!cart.paymentMethod) { props.history.push('/payment'); }

    const placeOrder = useSelector(state => state.orderCreate);
    const { loading, success, error, order } = placeOrder;
    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0));
    cart.shippingPrice = cart.itemsPrice > 499 ? toPrice(0) : toPrice(99);
    cart.taxPrice = toPrice(0.16 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const placeOrderHandler = () => {
        //PlaceOrderAction
        dispatch(placeOrderAction({ ...cart, order: cart.cartItems }));
    }
    useEffect(() => {
        if (success) {
            props.history.push(`/order/${order._id}`);
            dispatch({ type: PLACE_ORDER_RESET });
        }
    }, [dispatch, order, props.history, success]);
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Envío</h2>
                                <p>
                                    <strong>Nombre: </strong> {cart.shippingAddress.FullName} <br />
                                    <strong>Dirección: </strong> {cart.shippingAddress.Address}, {cart.shippingAddress.City}, {cart.shippingAddress.CP}, {cart.shippingAddress.Country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Pago</h2>
                                <p>
                                    <strong>Método: </strong> {cart.paymentMethod} <br />
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body"><h2>Resumén de la orden</h2>
                                <ul>
                                    {cart.cartItems.map((it) => (
                                        <li key={it.product}>
                                            <div className="row">
                                                <div>
                                                    <img src={it.img} alt={it.name} className="small"></img>
                                                </div>
                                                <div className="min-30">
                                                    <Link to={`/product/${it.product}`}>{it.name}</Link>
                                                </div>
                                                <div>{it.qty} x ${it.price} = {it.qty * it.price}</div>
                                            </div>
                                        </li>))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Resumen de la orden</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Articulos</div>
                                    <div>${toPrice(cart.itemsPrice)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Envio</div>
                                    <div>{
                                        cart.shippingPrice === 0 ? 'Gratis' : '$' + toPrice(cart.shippingPrice)
                                    }</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Impuestos</div>
                                    <div>${toPrice(cart.taxPrice)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div> <strong>Total</strong></div>
                                    <div> <strong>${toPrice(cart.totalPrice)}</strong> </div>
                                </div>
                            </li>
                            <li>
                                <button type="button" disabled={cart.cartItems.length === 0} onClick={placeOrderHandler} className="primary block">Comprar</button>
                            </li>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    )
}
