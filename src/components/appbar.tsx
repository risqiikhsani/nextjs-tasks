"use client"
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Appbar() {
    const { data: session } = useSession();

    
    return (
        <>
            <div className="p-4 fixed w-full top-0 start-0 z-50 shadow-xl  opacity-100">
            {session ? (
                <div className="flex items-center">
                    <h1>Welcome back, {session?.user?.name}</h1>
                    <span className="flex-1"></span>
                    <Button onClick={() => signOut()}>Logout</Button>
                </div>

            ) : (
                <div className="flex items-center">
                    <h1>Welcome</h1>
                    <span className="flex-1"></span>
                    <Button>
                        <Link href="/auth/login" >Login</Link>
                    </Button>
                </div>

            )}
            </div>
        </>
    );
}