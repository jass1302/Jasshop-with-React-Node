import { PLACE_ORDER_FAIL, PLACE_ORDER_REQUEST, PLACE_ORDER_RESET, PLACE_ORDER_SUCCESS } from "../constants/orderConstants";

export const placeOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case PLACE_ORDER_REQUEST:
            return { loading: true };
        case PLACE_ORDER_SUCCESS:
            return { loading: false, success: true, order: action.payload };
        case PLACE_ORDER_FAIL:
            return { loading: false, error: action.payload };
        case PLACE_ORDER_RESET:
            return {};
        default:
            return state;
    }
}