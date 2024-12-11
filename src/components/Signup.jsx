"use client"

import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { login } from '../store/authSlice'
import authService from '../appwrite/auth'
import { Mail, Lock, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from '@/hooks/use-toast'
function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { toast } = useToast()
    const [isCreating, setIsCreating] = useState(false)
    const form = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    })

    const onSubmit = async (data) => {
        setIsCreating(true)
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const currentUser = await authService.getCurrentUser()
                if (currentUser) dispatch(login(currentUser))
                navigate("/")
                toast({
                    title: "Account created",
                    description: "You have successfully created your account.",
                })
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            })
        } finally {
            setIsCreating(false)
        }
    }

    return (
        <div className="container mx-auto flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Create your account</CardTitle>
                    <CardDescription className="text-center">
                        Or{' '}
                        <Link to="/login" className="font-medium text-primary hover:underline">
                            sign in to your existing account
                        </Link>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                rules={{ required: "Full name is required" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                                <Input {...field} placeholder="Full Name" className="pl-10" />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                rules={{
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                        message: "Email address must be a valid address",
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
                                        value: 8,
                                        message: "Password must be at least 8 characters",
                                    }
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                                <Input {...field} type="password" placeholder="Password" className="pl-10" />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isCreating}>
                                {isCreating ? "Creating Account..." : "Create Account"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-muted-foreground">
                        By creating an account, you agree to our{' '}
                        <Link to="/terms" className="font-medium text-primary hover:underline">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="font-medium text-primary hover:underline">
                            Privacy Policy
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Signup
