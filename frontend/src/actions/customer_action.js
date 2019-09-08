import axios from 'axios';
import {
    GET_CUSTOMERS,
    GET_ALL_CUSTOMERS_DATA,
    GET_CUSTOMERS_BY_ID,
    GO_TO_HOME,
    SAVE_FILTERED_DATA,
    MAKE_CURRENT_CLIENT_NULL
} from './types';

export function getCustomers(skip, limit,filters =[], previousState = []){
    const data = {
        limit,
        skip,
        filters
    }

    console.log(data);
    const request = axios.post(`https://lit-forest-04012.herokuapp.com/api/extendedCustomers`,data)
                .then(response => {
                    let newState = [
                        ...previousState,
                        ...response.data.result
                    ];
                    return {
                        size: response.data.size,
                        result: newState
                    }
                });

    return {
        type: GET_CUSTOMERS,
        payload: request
    }

}

////////////////////////////////////
//////        Cutomer's Info
////////////////////////////////////


export function getAllCustomersData(skip, limit,filters =[]){

    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`https://lit-forest-04012.herokuapp.com/api/extendedCustomers`,data)
                .then(response => response.data.result);


    return {
        type: GET_ALL_CUSTOMERS_DATA,
        payload: request
    }

}

export function getCustomerByID(accountID){

    
    const request = axios.get(`https://lit-forest-04012.herokuapp.com/api/customers/${accountID}`)
                .then(response =>{
                    console.log(response.data)
                     return response.data 
                })


    return {
        type: GET_CUSTOMERS_BY_ID,
        payload: request
    }

}

export function makeCurrentClientNull(){

    

    return {
        type: MAKE_CURRENT_CLIENT_NULL,
        payload: ""
    }

}

export function saveFilteredData(param){


    return {
        type: SAVE_FILTERED_DATA,
        payload: param
    }

}

export function goToHome(param){


    return {
        type: GO_TO_HOME,
        payload: param
    }

}