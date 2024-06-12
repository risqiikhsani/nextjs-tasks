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
import { useRouter } from 'next/navigation'

export default function DeletePost({post_id}:{post_id:string}) {
    const router = useRouter()
    const onSubmit = async () => {
        const response = await fetch(`/api/posts/${post_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if(response.ok){
            console.log("Post updated successfully");
            router.refresh()
        }
        else{
            console.log("Error updating post");
        }
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild><Button>Delete Post
                    </Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Post</DialogTitle>
                        <DialogDescription>
                            Are you sure to delete post?
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