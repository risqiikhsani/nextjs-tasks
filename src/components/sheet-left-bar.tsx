"use client"


import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./ui/button";
import Link from "next/link";

export default function SheetLeftBar() {
    return (
        <>
            <Sheet>
                <SheetTrigger>Menu</SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                    <Button variant="link"><Link href="/">Tasks</Link></Button>
                    <Button variant="link"><Link href="/user">User</Link></Button>
                </SheetContent>
            </Sheet>

        </>
    );
}