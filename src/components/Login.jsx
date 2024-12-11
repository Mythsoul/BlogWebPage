"use client"

import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { login as authLogin } from '../store/authSlice'
import authService from "../appwrite/auth"
import { Mail, Lock, Eye, EyeOff, Loader } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from '@/hooks/use-toast'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { toast } = useToast()
    const form = useForm()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoggingIn, setIsLoggingIn] = useState(false)

    const onSubmit = async (data) => {
        setIsLoggingIn(true)
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData))
                navigate("/")
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            })
        } finally {
            setIsLoggingIn(false)
        }
    }

    return (
        <div className="container mx-auto flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Welcome back!</CardTitle>
                    <CardDescription className="text-center">Sign in to access your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                rules={{
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid email address"
                                    }
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                                <Input {...field} type="email" placeholder="Email address" className="pl-10" />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                rules={{
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                                <Input 
                                                    {...field} 
                                                    type={showPassword ? "text" : "password"} 
                                                    placeholder="Password" 
                                                    className="pl-10 pr-10"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                                                >
                                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="remember" />
                                    <Label htmlFor="remember">Remember me</Label>
                                </div>
                                <Button variant="link" className="p-0">Forgot password?</Button>
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoggingIn}>
                                {isLoggingIn && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                                Sign in
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-muted"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <Button variant="outline" className="w-full">
                            <img className="h-5 w-5" src="https://www.svgrepo.com/show/512120/facebook-176.svg" alt="Facebook" />
                        </Button>
                        <Button variant="outline" className="w-full">
                            <img className="h-5 w-5" src="https://www.svgrepo.com/show/513008/twitter-154.svg" alt="Twitter" />
                        </Button>
                        <Button variant="outline" className="w-full">
                            <img className="h-5 w-5" src="https://www.svgrepo.com/show/506498/google.svg" alt="Google" />
                        </Button>
                    </div>
                    <p className="text-center text-sm text-muted-foreground">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-medium text-primary hover:underline">
                            Sign up now
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Login
