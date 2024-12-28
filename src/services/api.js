import axios from "axios";

const API = axios.create({ baseURL: "https://mfflettmanagementbackend-6551d4a16fc3.herokuapp.com/api" });

export const login = (data) => API.post("/login", data);
export const getRoutes = () => API.get("/routes");
export const updateRouteStatus = (id, status) => API.put(`/routes/${id}/status`, { status });
