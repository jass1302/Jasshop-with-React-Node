import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signoutAction } from './actions/userActions';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderDetailsScreen from './screens/OrderDetailsScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/signinScreen';
import TemporalScreen from './screens/TemporalScreen';
function App() {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signoutAction());
  }

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
            {
              userInfo ? (
                <div className="dropdown">
                  <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i> </Link>
                  <ul className="dropdown-content">
                    <Link to="#signout" onClick={signoutHandler}>Salir</Link>
                  </ul>
                </div>
              ) : (
                <Link to="/signin">Ingresar</Link>
              )
            }

          </div>
        </header>
        <main>
          <Route path='/cart/:id?' component={CartScreen}></Route>
          <Route path='/' component={HomeScreen} exact></Route>
          <Route path='/product/:id' component={ProductScreen}></Route>
          <Route path='/signin' component={SigninScreen}></Route>
          <Route path='/signup' component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/admin" component={TemporalScreen}></Route>
          <Route path="/order/:id" component={OrderDetailsScreen}></Route>
        </main>
        <footer className="row center">Desarrollo en progreso por: Jassiel Hernández</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
