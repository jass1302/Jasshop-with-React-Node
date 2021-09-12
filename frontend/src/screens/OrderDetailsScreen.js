import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { orderDetails, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PayPalButton } from 'react-paypal-button-v2';
import { ORDER_PAY_RESET } from '../constants/orderConstants';


export default function OrderDetailsScreen(props) {
    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const detailsOrder = useSelector((state) => state.orderDetails);

    const { order, loading, error } = detailsOrder;
    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, error: errorPay, success: successPay } = orderPay;
    const dispatch = useDispatch();

    useEffect(() => {
        const addPaypalScript = async () => {
            const { data } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}&currency=MXN`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if (!order || successPay || (order && order._id !== orderId)) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(orderDetails(orderId));
        } else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPaypalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, orderId, order, sdkReady]);

    const successPaymentHandler = (paymentResult) => {
        //Payment Action
        dispatch(payOrder(order, paymentResult));
    };

    return loading ? < LoadingBox ></LoadingBox > :
        error ? <MessageBox variant="danger"></MessageBox> :
            (
                <div>
                    <h1>Detalles de tu orden ({order._id}) </h1>
                    <div className="row top">
                        <div className="col-2">
                            <ul>
                                <li>
                                    <div className="card card-body">
                                        <h2>Detalles de envío</h2>
                                        <p>
                                            <strong>Name:</strong> {order.shippingAddress.FullName}<br />
                                            <strong>Dirección:</strong> {order.shippingAddress.Address}, {order.shippingAddress.City}, {order.shippingAddress.CP}, {order.shippingAddress.Country}
                                        </p>
                                        {order.isDelivered ? <MessageBox variant="success">Entregado el {order.deliveredAt}</MessageBox> :
                                            <MessageBox variant="danger">Pendiente de entrega</MessageBox>}
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>Pago</h2>
                                        <p>
                                            <strong>Metodo de pago:</strong>
                                            {order.paymentMethod}
                                        </p>
                                        {order.isPaid ? <MessageBox variant="success">Pago recibido el {order.paidAt}</MessageBox> :
                                            <MessageBox variant="danger">Pago por efectuar</MessageBox>}
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>Articulos</h2>
                                        <ul>
                                            {order.orderItems.map(
                                                (item) => (
                                                    <li key={item.product}>
                                                        <div className="row">
                                                            <div>
                                                                <img src={item.img} alt={item.name} className="small" />
                                                            </div>
                                                            <div className="min-30">
                                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                            </div>
                                                            <div>{item.qty} x ${item.price} = {item.qty * item.price}</div>
                                                        </div>
                                                    </li>))}
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-1">
                            <div className="card card-body">
                                <ul> <li> <h2>Resumen de la orden</h2> </li>
                                    <li>
                                        <div className="row">
                                            <div>Articulos</div>
                                            <div>${order.itemsPrice}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Envio</div>
                                            <div>{
                                                order.shippingPrice === 0 ? 'Gratis' : '$' + order.shippingPrice
                                            }</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Impuestos</div>
                                            <div>${order.taxPrice}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div> <strong>Total</strong></div>
                                            <div> <strong>${order.totalPrice}</strong> </div>
                                        </div>
                                    </li>
                                    {
                                        !order.isPaid && (
                                            <li>
                                                {!sdkReady ? (<LoadingBox></LoadingBox>) :
                                                    (
                                                        <>
                                                            {errorPay && <MessageBox variant="danger">{errorPay}</MessageBox>}
                                                            {loadingPay && <LoadingBox></LoadingBox>}
                                                            <PayPalButton
                                                                amount={order.totalPrice}
                                                                currency='MXN'
                                                                onSuccess={successPaymentHandler}> </PayPalButton>
                                                        </>
                                                    )}
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>

                        </div>
                    </div>

                </div >
            )
}

