"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation'

export default function ClaimCoupon({coupon_id}:{coupon_id:string}) {
    const router = useRouter()
    const onSubmit = async () => {
        const response = await fetch(`/api/coupon-claim/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                couponId: coupon_id
            })
        });

        if(response.ok){
            console.log("claimed successfully");
            router.refresh()
            toast.success('claimed successfully');
        }
        else{
            console.log("Error claim coupon");
        }
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild><Button>Claim
                    </Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Claim coupon</DialogTitle>
                        <DialogDescription>
                            Are you sure to Claim coupon?
                        </DialogDescription>
                        <DialogClose asChild>
                        <Button onClick={onSubmit}>
                            Claim
                        </Button>
                        </DialogClose>

                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </>
    )
}