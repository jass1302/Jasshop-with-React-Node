import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { orderDetails } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderDetailsScreen(props) {
    const orderId = props.match.params.id;
    const detailsOrder = useSelector((state) => state.orderDetails);

    const { order, loading, error } = detailsOrder;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(orderDetails(orderId));
    }, [dispatch, orderId]);

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
                                    {loading && <LoadingBox></LoadingBox>}
                                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                                </ul>
                            </div>

                        </div>
                    </div>

                </div>
            )
}

