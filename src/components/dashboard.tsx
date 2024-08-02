"use client"

import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";


export default function Dashboard() {
    const { data: session } = useSession();

    return (
        <div>

            {session ? (
                <>
                    <h1>Welcome back, {session?.user?.name}</h1>
                    <Button onClick={() => signOut()}>Logout</Button>
                </>

            ) : (
                <>
                    <h1>Welcome</h1>
                    <Button>
                        <Link href="/auth/login" >Login</Link>
                    </Button>
                </>

            )}
        </div>
    );
}