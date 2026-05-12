import { Layout } from "@/components/Layout";
import { Login } from "@/pages/Login/Login";
import { Route, Routes } from "react-router-dom";

export const AppRouter =() =>{
    return(
        <Routes>
            <Route path ="/login" element ={<Login/>}/>

            //Keep Laout in every Page
            <Route element ={<Layout/>}>

            </Route>
        </Routes>
    )
}