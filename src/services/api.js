import axios from "axios";
import config from "../../config";


const API = axios.create({ baseURL: `${config.base_url}` });

export const login = (data) => API.post("/login", data);
export const getRoutes = () => API.get("/routes");
export const updateRouteStatus = (id, status) => API.put(`/routes/${id}/status`, { status });
