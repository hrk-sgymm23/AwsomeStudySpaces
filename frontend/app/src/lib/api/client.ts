import axios from "axios";

const baseEndpoint = process.env.REACT_APP_BASE_ENDPOINT_URL;

const client = axios.create({
  baseURL: baseEndpoint,
});

export default client;
