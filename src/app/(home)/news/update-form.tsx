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
    title: z.string().min(2).max(50),
    text: z.string().min(2).max(50)
})

export default function UpdateForm({ data }: { data: any }) {
    const router = useRouter()
    const [imageUrl, setImageUrl] = useState(data.image)
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: data.title,
            text: data.text
        },
        // Reset form with new data after successful update
        values: {
            title: data.title,
            text: data.text
        }
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const newValues = {
            ...values,
            image: imageUrl
        }

        try {
            const response = await fetch(`/api/news/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newValues),
            });
    
            if (response.ok) {
                console.log("Updated successfully");
                toast.success('Updated successfully');
                router.refresh()
            } else {
                const errorData = await response.json(); // Parse JSON response from backend
                toast.error(`Error updating: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error submitting the form:", error);
            toast.error(`Failed to update: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
                        <DialogTitle>Update News</DialogTitle>
                        <DialogDescription>
                            Update.
                            {/* {JSON.stringify(data)} */}
                        </DialogDescription>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="title" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="text"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>text</FormLabel>
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