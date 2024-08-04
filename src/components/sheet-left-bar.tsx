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
                    <Button variant="link"><Link href="/">Posts</Link></Button>
                    <Button variant="link"><Link href="/coupons">Coupons</Link></Button>
                    <Button variant="link"><Link href="/my-coupons">My Coupon</Link></Button>
                </SheetContent>
            </Sheet>

        </>
    );
}