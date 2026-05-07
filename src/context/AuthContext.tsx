import React, { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../types/user.types";
import { authService } from "@/services/auth.service";

interface AuthContextType{
    user: User | null;
    token: string | null;
    login: (token: string, user: User) => void;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);  

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
children,
}) => {

    const[user, setUser] = useState<User | null>(null)
    const[token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );
    const [loading,  setLoading] = useState(true);
    
    
    useEffect(() =>{
        const fetchUser = async () =>{
                if (token && !user) {
                    try {
                    const res = await authService.getCurrentUser();
                    setUser(res.data);
                    } catch (error) {
                        localStorage.removeItem("token")
                        setToken(null);
                    }   
                }
                setLoading(false);
        } 
        fetchUser()
    }, [token])

    const login =(newToken: string, userData:User) =>{ 
        localStorage.setItem("token", newToken)
        setUser(userData);
        setUser(userData);
    }

    const logout = async() =>{
        try {
            await authService.logout();
        } catch (error) {
            console.log("Logout API not working", error);
        }finally{
            localStorage.removeItem("token");
            setToken(null);
            setUser(null);
        }
    }
    return (
        <AuthContext.Provider value = {{user, token, loading, login, logout}}>
                {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType =>{
    const result = useContext(AuthContext);
    if(!result) throw new Error("useAuth Must be used within AuthProvider")
        return result;
}