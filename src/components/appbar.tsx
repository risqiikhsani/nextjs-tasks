"use client"
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";
import SheetLeftBar from "./sheet-left-bar";

export default function Appbar() {
    const { data: session } = useSession();

    
    return (
        <>
            <div className="flex items-center justify-between p-4 fixed w-full top-0 start-0 z-40 bg-gradient-to-r from-blue-200 to-blue-300 dark:bg-gradient-to-r dark:from-slate-700 dark:to-slate-900 shadow-xl">
            {session ? (
                <>
                    <SheetLeftBar/>
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
        </>
    );
}