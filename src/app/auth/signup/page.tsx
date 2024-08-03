"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";

const formSchema = z
    .object({
        name: z
            .string()
            .min(1, {
                message: "This field has to be filled.",
            })
            .max(50, {
                message: "This field can't be longer than 50 characters.",
            }),
        username: z
            .string()
            .min(1, {
                message: "This field has to be filled.",
            })
            .max(50, {
                message: "This field can't be longer than 50 characters.",
            }),
        email: z
            .string()
            .min(1, {
                message: "This field has to be filled.",
            })
            .email("This is not a valid email")
            .max(50, {
                message: "This field can't be longer than 50 characters.",
            }),
        password: z
            .string()
            .min(6, { message: "Password has to be at least 6 characters long." }),
        confirmPassword: z.string().min(6, {
            message: "Confirm-Password has to be at least 6 characters long.",
        }),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: "custom",
                message: "The passwords did not match",
                path: ["confirmPassword"],
            });
        }
    });

const Page = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        try {
            const response = await fetch(`/api/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "An error occurred");
            }
    
            const data = await response.json();
            toast.success("Account created!");
            form.reset();
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unexpected error occurred");
            }
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <h1 className="text-2xl font-semibold">Sign up</h1>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>name</FormLabel>
                                <FormControl>
                                    <Input placeholder="johndoe alexander" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>username</FormLabel>
                                <FormControl>
                                    <Input placeholder="johndoe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="johndoe@whatever.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormDescription>Please confirm your password</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Sign up</Button>
                </form>
            </Form>
            <Button variant="link">
                <Link className="block" href={"/auth/login"}>
                    Already have an account ? Login
                </Link>
            </Button>
        </>

    );
};

export default Page;