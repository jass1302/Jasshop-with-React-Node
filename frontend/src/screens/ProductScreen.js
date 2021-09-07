import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import data from '../data';

function ProductScreen(props) {
    const product = data.products.find((x) => x._id === props.match.params.id);
    if (!product) {
        return <div>Product not found</div>
    }
    return (
        <div>
        <Link to="/">Volver a los resultados</Link>
            <div className="row top">
                <div className="col-2">
                    <img src={product.image} alt={product.name}></img>
                </div>
                <div className="col-1">
                    <ul>
                        <li>
                            <h1>{product.name}</h1>
                        </li>
                        <li>
                            <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                        </li>
                        <li>
                            Price: ${product.price}
                        </li>
                        <li>
                            Descripción: <p>{product.desc}</p>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <div className="row">
                                    <div>Precio:</div>
                                    <div className="price"> ${product.price} </div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Estatus:</div>
                                    <div> {
                                        product.stock > 0 ? <span className="success">Disponible</span> :
                                            <span className="danger">No disponible</span>
                                    }</div>
                                </div>
                            </li>
                            <li>
                                <button className="primary block">Agregar al carrito</button>
                            </li>

                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProductScreen;