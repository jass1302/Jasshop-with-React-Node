import { ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_MINE_LIST_FAIL, ORDER_MINE_LIST_REQUEST, ORDER_MINE_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS, PLACE_ORDER_FAIL, PLACE_ORDER_REQUEST, PLACE_ORDER_RESET, PLACE_ORDER_SUCCESS } from "../constants/orderConstants";

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

export const orderDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { loading: true }
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload }
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;

    }
}

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return { loading: true };
        case ORDER_PAY_SUCCESS:
            return { loading: false, success: true };
        case ORDER_PAY_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_PAY_RESET:
            return {};
        default:
            return state;
    }
}

export const orderMineListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_MINE_LIST_REQUEST:
            return { loading: true };
        case ORDER_MINE_LIST_SUCCESS:
            return { loading: false, orders: action.payload };
        case ORDER_MINE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
