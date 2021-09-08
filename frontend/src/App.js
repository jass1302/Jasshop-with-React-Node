import React from 'react';
import { useSelector } from 'react-redux';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  const cart = useSelector(state=> state.cart);
  const {cartItems} = cart;
  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/">JasShop</Link>
        </div>
        <div>
          <Link to="/cart">Carrito
          {
            cartItems.length > 0 // Si se cumple esto
            ? // Entonces '?'
            <span className="badge">{cartItems.length}</span> //Hacemos esto
            : // De lo contrario
            <></> //Esto otro
          }
          </Link>
          <Link to="/signin">Ingresar</Link>
        </div>
      </header>
      <main>
      <Route path='/cart/:id?' component={CartScreen}></Route>
      <Route path='/' component={HomeScreen} exact></Route>
      <Route path='/product/:id' component={ProductScreen} exact></Route>
      </main>
      <footer className="row center">Desarrollo en progreso por: Jassiel Hernández</footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
