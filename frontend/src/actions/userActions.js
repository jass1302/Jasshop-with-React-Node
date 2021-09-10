import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from "../constants/userConstants";
import Axios from 'axios';

export const signinAction = (email, password) => async (dispatch) => {
    dispatch({
        type: USER_SIGNIN_REQUEST,
        payload: { email, password }
    });
    try {
        const { data } = await Axios.post(
            '/api/users/signin',
            { email, password }
        );
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (err) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload:
                err.response && err.response.data.message ?
                    err.response.data.message : err.message
        });
    }
}
export const registerAction = (name, email, password) => async (dispatch) => {
    dispatch({
        type: USER_REGISTER_REQUEST,
        payload: { name, email, password }
    });
    try {
        const { data } = await Axios.post('/api/users/signup', { name, email, password });

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });

    } catch (err) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                err.response && err.response.data.message ?
                    err.response.data.message : err.message
        });
    }

}
export const signoutAction = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    dispatch({ type: USER_SIGNOUT });
    document.location.href = '/signin';
}