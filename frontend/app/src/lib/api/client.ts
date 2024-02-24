import axios from "axios";

const baseEndpoint = process.env.REACT_APP_BASE_ENDPOINT_URL

const client = axios.create({
    // baseURL: "http://localhost:3001/api/v1",
    baseURL: baseEndpoint,
});

export default client;