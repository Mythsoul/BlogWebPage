import {useState} from "react"
import { Link , useNavigate } from "react-router-dom"
import { Login as authLogin } from "../store/authSlice"

import Button from "./button"
import Input from "./inputBox"
import { useForm } from "react-hook-form"
import Logo from "./Logo"
import { createAccount } from "../Appwrite"
export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors}
  } = useForm()

  const navigate = useNavigate()
 const UserRegister = (data) => {

    createAccount(data);
    navigate("/")

 } 
 
 
  return (
    <>
   <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
               
                <form onSubmit={handleSubmit(UserRegister)}>
                    <div className='space-y-5'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                            minLength: {
                                value: 3,
                                message: "Name must be at least 3 characters"
                            },
                            maxLength: {
                                value: 20,
                                message: "Name must be at most 20 characters"
                            }
                        })}
                        />
                         {errors.name && <p className="text-red-600 mt-8 text-center">{errors.name.message}</p>}

                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,

                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                           
                            }
                        })}
                    
                        />
                         {errors && <p className="text-red-600 mt-8 text-center">{errors.email ? errors.email.message : ""}</p>}

                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            },
                            maxLength: {
                                value: 20,
                                message: "Password must be at most 20 characters"
                            }, 
                            
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                    message: "Password must contain at least one letter, one number, and one special character"
                                }, 
                        
                        })}

                        />
                         {errors.password && <p className="text-red-600 mt-8 text-center">{errors.password.message}</p>}

                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

    </div>
 </> )
}
