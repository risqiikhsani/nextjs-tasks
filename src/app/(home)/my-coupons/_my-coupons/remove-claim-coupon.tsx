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

export default function RemoveClaimCoupon({coupon_id}:{coupon_id:string}) {
    const router = useRouter()
    const onSubmit = async () => {
        const response = await fetch(`/api/coupon-claim/${coupon_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if(response.ok){
            console.log("delete successfully");
            router.refresh()
            toast.success('delete successfully');
        }
        else{
            console.log("Error delete coupon");
        }
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild><Button>Delete
                    </Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete coupon</DialogTitle>
                        <DialogDescription>
                            Are you sure to Delete coupon that you claimed ?
                        </DialogDescription>
                        <DialogClose asChild>
                        <Button onClick={onSubmit}>
                            Delete
                        </Button>
                        </DialogClose>

                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </>
    )
}