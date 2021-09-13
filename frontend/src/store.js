import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { productDetailsReducer, productListReducer } from './reducers/productReducers';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { userDetailsReducer, userSigninReducer, userSignupReducer } from './reducers/userReducer';
import { orderDetailsReducer, orderMineListReducer, orderPayReducer, placeOrderReducer } from './reducers/orderReducers';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo') ?
            JSON.parse(localStorage.getItem('userInfo')) :
            null
    },
    cart: {
        cartItems: localStorage.getItem('cartItems') ?
            JSON.parse(localStorage.getItem('cartItems')) :
            [],
        shippingAddress: localStorage.getItem('shippingAddress') ?
            JSON.parse(localStorage.getItem('shippingAddress')) :
            {},
        paymentMethod: 'Paypal'
    }
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userSignup: userSignupReducer,
    orderCreate: placeOrderReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;