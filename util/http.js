import axios from 'axios';

const BACKEND_URL =
    'https://expense-app-595e5-default-rtdb.asia-southeast1.firebasedatabase.app';

const getOp = (endpoint) => {
    return axios.get(endpoint)
}

const postOp = (endpoint, data) => {
    return axios.post(BACKEND_URL + endpoint, data)
}

const putOp = (endpoint, data) => {
    return axios.put(BACKEND_URL + endpoint, data)
}

const patchOp = (endpoint, data) => {
    return axios.patch(BACKEND_URL + endpoint, data)
}

const deleteOp = (endpoint, data) => {
    return axios.delete(BACKEND_URL + endpoint, data)
}