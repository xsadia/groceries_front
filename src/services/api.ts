import axios from "axios";

export const apiClient = axios.create({
    baseURL: 'https://ts-grocery-list.herokuapp.com/'
});