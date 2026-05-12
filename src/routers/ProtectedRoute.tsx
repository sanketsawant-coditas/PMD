import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function  ProtectedRoute(){
    const { user } = useAuth();
    if(!user) return <Navigate to = "/login" replace />
    return <Outlet/>
}