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

export default function DeleteCoupon({coupon_id}:{coupon_id:string}) {
    const router = useRouter()
    const onSubmit = async () => {
        const response = await fetch(`/api/coupon/${coupon_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if(response.ok){
            console.log("coupon updated successfully");
            router.refresh()
            toast.success('Deleted successfully');
        }
        else{
            console.log("Error updating coupon");
        }
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild><Button>Delete coupon
                    </Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete coupon</DialogTitle>
                        <DialogDescription>
                            Are you sure to delete coupon?
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