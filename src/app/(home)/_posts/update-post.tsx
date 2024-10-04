"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { toast } from 'sonner';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { categories } from "@/constants/categories"
import { UploadButton } from "@/utils/uploadthing"
import { useState } from "react"
import Image from "next/image"

const formSchema = z.object({
    name: z.string().min(2).max(50),
    detail: z.string().min(2).max(50)
})



export default function UpdateTask({ data }: { data: any }) {
    const router = useRouter()
    const [imageUrl, setImageUrl] = useState(data.image)
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data.name,
            detail: data.detail
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await fetch(`/api/tasks/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
    
            if (response.ok) {
                console.log("Task updated successfully");
                form.reset();
                router.refresh();
                toast.success('Updated successfully');
            } else {
                const errorData = await response.json(); // Parse JSON response from backend
                toast.error(`Error updating task: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error submitting the form:", error);
            toast.error(`Failed to update task: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    


    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        Update
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Task</DialogTitle>
                        <DialogDescription>
                            Update Task.
                        </DialogDescription>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="title" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="detail"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>detail</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Description"
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <UploadButton
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(res) => {
                                        // Do something with the response
                                        console.log("Files: ", res);
                                        setImageUrl(res[0].url);
                                        toast.info("Upload Completed");
                                    }}
                                    onUploadError={(error: Error) => {
                                        // Do something with the error.
                                        toast.info(`ERROR! ${error.message}`);
                                    }}
                                    content={{
                                        button({ ready }) {
                                            if (ready) return <div>Upload Image</div>;

                                            return "Getting ready...";
                                        },
                                        allowedContent({ ready, fileTypes, isUploading }) {
                                            if (!ready) return "Checking what you allow";
                                            if (isUploading) return "Seems like Image is uploading";
                                            return `Image you can upload: ${fileTypes.join(", ")}`;
                                        },
                                    }}
                                />

                                {imageUrl && <Image src={imageUrl} alt="image" width="200" height="200" />}


                                <DialogClose asChild>
                                    <Button type="submit">Submit</Button>
                                </DialogClose>

                            </form>
                        </Form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </>
    )
}