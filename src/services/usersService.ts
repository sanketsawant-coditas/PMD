import { api } from "@/api/axios";
import type { PaginationResponse } from "@/types/common.types";
import type { User } from "@/types/user.types";

export const userService = {
    getAllUsers: (page: number, limit: number) =>{
        api.get<PaginationResponse<User>>(`/users?page=${page}&limit=${limit}`)
    },
    
    getUserById : (id: string) => {
        api.get(`/users/${id}`)
    },

    createUser: (data: Partial<User> & {password: string}) => {
        api.post<User>("/users", data)
    },

    getUsersByRole : (role: string, page: number, limit: number) => {
        api.get<PaginationResponse<User>>(`/users/role/${role}?page=${page}&limit=${limit}`)
    },

    updateUser: (id: string, data: Partial<User>) => {
        api.patch(`/users/${id}`, data)

    },
    
    toggleUserStatus : (id: string) => { 
        api.patch(`/users/${id}/toggle-status`)
    },

    deleteUser: (id:string) => {
        api.delete(`/users/${id}`)
    }
}