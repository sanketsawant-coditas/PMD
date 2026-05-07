import { api } from "@/api/axios";
import type { LoginResponce } from "@/types/api.type";
import type { User } from "@/types/user.types";
import axios from "axios";

export const authService = {
    login :(email: string, password: string) => {
        axios.post<LoginResponce>("/auth/login",{email, password})
    },
    logout: () => api.post("/auth/logout"),

    getCurrentUser: () => api.get<User>("/users/me")
}