import type { User } from "./user.types";

export interface LoginResponce{
    access_token: string;
    user: User;
}

