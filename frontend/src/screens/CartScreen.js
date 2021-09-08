import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

function CartScreen(props) {
    const productId = props.match.params.id;
    const qty = props.location.search ?
        Number(props.location.search.split('=')[1]) : 1;
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const dispatch = useDispatch();
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        //delete-action
        dispatch(removeFromCart(id));
    }
    const checkOutHandler = () => {
        props.history.push('/signin/?redirect=shipping');
    }
    return (
        <div className="row top">
            <div className="col-2">
                <h1>Carrito de compras</h1>
                {
                    cartItems.length === 0
                        ?
                        <MessageBox>
                            El carrito está vacío. <Link to="/">Regresa a la página principal.</Link>
                        </MessageBox>
                        :
                        <ul>{ cartItems.map((it) => (
                            <li key={it.product}>
                                <div className="row">
                                    <div>
                                        <img src={it.img} alt={it.name} className="small"></img>
                                    </div>
                                    <div className="min-30">
                                        <Link to={`/product/${it.product}`}>{it.name}</Link>
                                    </div>
                                    <div>
                                        <select 
                                        value={it.qty} 
                                        onChange ={(e)=>dispatch(addToCart(it.product,Number(e.target.value)))}>
                                        {
                                            [...Array(it.stock).keys()].map(
                                                (x) => ( <option key={x+1} value={x + 1}>{x + 1}</option>
                                            ))
                                        }
                                        </select>
                                    </div>
                                    <div>${it.price}</div>
                                    <div>
                                        <button type="button" 
                                        onClick={() => removeFromCartHandler(it.product)}>Borrar</button>
                                    </div>
                                </div>
                            </li>))}
                        </ul>
                }
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>Subtotal ({cartItems.reduce((a, c) => a + c.qty,0)} productos) : $
                            {cartItems.reduce((a, c) => a + (c.price * c.qty),0)}
                            </h2>
                        </li>
                        <li>
                            <button type="button" onClick={checkOutHandler} className="primary block" disabled={cartItems.length===0}>
                                Terminar con la compra
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CartScreen;