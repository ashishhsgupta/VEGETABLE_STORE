import axios from "axios";
import { SOMETHING_WENT_WRONG } from "./message-constant,jsx";

const BASE_URL = '/api/';
const headers = {
    "Content-Type" : "application/json",
    Accept: "application/json",
};

const _get = (url, config) => {
    const reqURL = `${BASE_URL}${url}`;
    return new Promise((resolve, reject) => {
      axios.get(reqURL, {...config, 
     headers:headers,
    })
    .then((response) => {
        const { status, message, data, error} = response.data;
        if(error){
            reject(error);
        }else if(status){
            resolve(data || message);
        }else{
            reject(SOMETHING_WENT_WRONG);
        }
    })
    .catch((error) => reject(error));
    });
};

const _delete = (url, config) => {
    const reqURL = `${BASE_URL}${url}`;
    return new Promise((resolve, reject) => {
        axios.delete(reqURL, config || {})
        .then((response) => {
            const {status, message, data, error} = response.data;
            if(error){
                reject(error);
            }else if(status){
                return data || message;
            }else {
                reject(SOMETHING_WENT_WRONG);
            }
        })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
};

const _put = (url, data, config)=> {
    const reqURL = `${BASE_URL}${url}`;
    return new Promise((resolve, reject) => {
        axios.put(reqURL, data || {}, config || {})
        .then((response) => {
            const {status, message, data, error} = response.data;
            if(error){
                reject(error);
            }else if(status){
                return data || message;
            }else{
                reject(SOMETHING_WENT_WRONG);
            }
        })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
};

const _post = (url, data, config) => {
    const reqURL = `${BASE_URL}${url}`;
    return new Promise((resolve, reject) => {
        axios.post(reqURL, data || {}, config || {})
        .then((response) => {
            const {status, message, data, error} = response.data;
            if(error){
                reject(error);
            }else if(status){
                return data || message;
            }else{
                reject(SOMETHING_WENT_WRONG);
            }
        })
        .then((data) => resolve(data))
        .catch((erro) => reject(error));
    });
};

export {_get, _delete, _put, _post};