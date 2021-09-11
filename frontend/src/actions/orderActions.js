import Axios from "axios";
import { CART_EMPTY } from "../constants/cartConstants";
import { PLACE_ORDER_FAIL, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS } from "../constants/orderConstants"

export const placeOrderAction = (order) => async (dispatch, getState) => {
    dispatch({
        type: PLACE_ORDER_REQUEST,
        payload: order
    });
    try {
        const {
            userSignin: { userInfo },
        } = getState();

        const { data } = await Axios.post('/api/orders', order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({
            type: PLACE_ORDER_SUCCESS, payload: data.order
        });
        dispatch({
            type: CART_EMPTY,
        });
        localStorage.removeItem('cartItems');
    } catch (error) {
        dispatch({
            type: PLACE_ORDER_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }

}