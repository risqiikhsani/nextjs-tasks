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

export default function DeleteTask({Task_id}:{Task_id:string}) {
    const router = useRouter()
    const onSubmit = async () => {
        try {
            const response = await fetch(`/api/tasks/${Task_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
    
            if(response.ok){
                console.log("Task updated successfully");
                router.refresh()
                toast.success('Deleted successfully');
            }
            else{
                const errorData = await response.json()
                console.log("Error deleting Task:", errorData.message)
                toast.error(`Error deleting task: ${errorData.message || 'Unknown error'}`)
            }            
        } catch (error) {
            console.error("Error :", error)
            toast.error(`Failed to delete task: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }

    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild><Button>Delete
                    </Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Task</DialogTitle>
                        <DialogDescription>
                            Are you sure to delete Task?
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