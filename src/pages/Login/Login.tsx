import React from "react";
import { Button } from "@/components/Button/Button";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/schemas/auth.schemas";
import { email } from "zod";

export const Login = () => { 
   const { login } =useAuth();
   const navigation = useNavigate();
   const {
      register,
      handleSubmit,
      reset,
      formState: {errors, isDirty},
      setError
   } = useForm<LoginFormData>({
      resolver: zodResolver(loginSchema),
      defaultValues: {email:"", Password: ""}
   });

   const onSubmit = async() =>{
      
   } 
   return(

      <div>
         <input type="text" placeholder="Email" />
         <input type="text" placeholder="Password" />
         <Button type="submit">Login</Button>
      </div>
   )     
}   