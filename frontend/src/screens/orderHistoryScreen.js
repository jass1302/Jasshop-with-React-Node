import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderHistoryScreen(props) {
    const orderMineList = useSelector((state) => state.orderMineList);
    const { loading, error, orders } = orderMineList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrderMine());
    }, [dispatch]);
    return (
        <div>
            <h1>Historial de ordenes</h1>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th>Pago</th>
                            <th>Entrega</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(
                                (order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice.toFixed(2)}</td>
                                        <td>{order.isPaid ? <> Recibido el: {order.paidAt.substring(0, 10)} </> : <> Pago pendiente</>}</td>
                                        <td>{order.isDelivered ? <>{order.paidAt.substring(0, 10)} </> : <> Entrega pendiente</>}</td>
                                        <td>
                                            <button className="small" type="button"
                                                onClick={() => { props.history.push(`/order/${order._id}`) }}>Detalles</button>
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            )
            }

        </div>
    )
}
