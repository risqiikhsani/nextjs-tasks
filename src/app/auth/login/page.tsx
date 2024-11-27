
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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const URL = process.env.NEXT_PUBLIC_URL;
const formSchema = z.object({
    username: z
        .string()
        .min(1, {
            message: "This field has to be filled.",
        })
        .max(30, {
            message: "username can't be longer than 300 characters.",
        }),
    password: z
        .string()
        .min(6, { message: "Password has to be at least 6 characters long." }),
});

const Page = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    });

    const router = useRouter();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await signIn("credentials", {
            username: values.username,
            password: values.password,
            redirect: false,
        });

        if (!response?.error) {
            router.push("/");
            toast.success("You are now signed in!");
        }
        else{
            toast.error("Wrong credentials or something wrong.")
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <h1 className="text-2xl font-semibold">Login</h1>
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

                    <Button type="submit">Login</Button>
                </form>
            </Form>
            <div className="flex flex-col gap-2 mt-2 text-center">
                <p>or login with OAuth</p>
                <Button onClick={() => signIn("google", { callbackUrl: `${URL}` })} disabled>Login Google</Button>
                <Button onClick={() => signIn("github", { callbackUrl: `${URL}` })} disabled>Login Github</Button>
            </div>
            <Button variant="link">
            <Link className="block" href={"/auth/signup"}>
                Don{'`'}t have an account ? Sign up
            </Link>
            </Button>
            
        </>

    );
};

export default Page;