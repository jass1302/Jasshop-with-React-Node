import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="row">
        <div>
          <a className="brand" href="/">JasShop</a>
        </div>
        <div>
          <a href="/cart">Carrito</a>
        </div>
        <div>
          <a href="/signin">Ingresar</a>
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
