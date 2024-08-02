"use client"

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

const URL = process.env.NEXT_PUBLIC_URL;

export default function Page() {


    return (
        <div className="container p-2 flex flex-col gap-2">
            <Button onClick={() => signIn("google",{callbackUrl:`${URL}`})}>Login Google</Button>
            <Button onClick={() => signIn("github",{callbackUrl:`${URL}`})}>Login Github</Button>
        </div>
    );
}