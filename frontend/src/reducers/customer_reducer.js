import {
    GET_CUSTOMERS,
    GET_ALL_CUSTOMERS_DATA,
    GET_CUSTOMERS_BY_ID,
    GO_TO_HOME,
    SAVE_FILTERED_DATA,
    MAKE_CURRENT_CLIENT_NULL,
} from '../actions/types';
 

export default function(state={},action){
    switch(action.type){
        case GET_ALL_CUSTOMERS_DATA:
            return {...state, customersData: action.payload }
        case GET_CUSTOMERS:
            return {
                ...state,
                toCustomer: action.payload.result,
                toCustomerSize: action.payload.size
            }
        case GET_CUSTOMERS_BY_ID:
            return {
                ...state,
                currentCustomer:action.payload
            }
        case GO_TO_HOME:
            return {
                ...state,
                currentCustomer:action.payload
        }
        case SAVE_FILTERED_DATA:
            return {
                ...state,
                filteredData:action.payload
        }
        case MAKE_CURRENT_CLIENT_NULL:
            return {
                ...state,
                currentCustomer:action.payload
        }
        default:
            return state;
    }
}