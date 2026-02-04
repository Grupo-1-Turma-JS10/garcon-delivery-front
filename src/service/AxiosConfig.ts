import axios from "axios";

const api = axios.create({
    baseURL: 'https://garcon-delivery-4ib2.onrender.com/'
});

export default api;
