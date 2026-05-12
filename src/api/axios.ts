import axios from "axios";
import { toast } from "react-hot-toast";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers :{
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use((config) =>{
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (res) => res,
    (err) => {
    const status = err.response?.status;
    const message = err.response?.data?.message || "Something went wrong";
     //   
    if (status === 401) {
        localStorage.removeItem("token");
        if (window.location.pathname! === "/login") {
            toast.error("Session Expired. Please login again");
            window.location.href = "/login"
        }else if(status === 403){
            toast.error("You do not have permision for this action")
        }else if(status === "404"){
            toast.error("Resource not found")
        }else{
            toast.error(message)
        }
        return Promise.reject(err);
    }
})

