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
import { set, useForm } from "react-hook-form"
import { z } from "zod"
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
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { toast } from 'sonner';
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { UploadButton } from "@/utils/uploadthing"
import { useState } from "react"
import Image from "next/image"
import { categories } from "@/constants/categories"
import { Textarea } from "@/components/ui/textarea"
const formSchema = z.object({
    title: z.string().min(2).max(50),
    text: z.string().min(2).max(50),
})



export default function CreateForm() {
    const router = useRouter()
    const [imageUrl, setImageUrl] = useState("")
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            text: ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const newValues = {
            ...values,
            image: imageUrl
        }

        console.log(newValues)

        try {
            const response = await fetch(`/api/news`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newValues)
            });
    
            if (response.ok) {
                console.log("created successfully");
                form.reset();
                setImageUrl("");
                router.refresh()
                toast.success('Created Successfully');
            }
            else {
                const errorData = await response.json()
                console.log("Error creating ");
                form.reset();
                toast.error(`Error creating : ${errorData.message || 'Unknown error'}`)
                setImageUrl("");
            }    
        } catch (error) {
            console.error("Error submitting the form:", error)
            toast.error(`Failed to create : ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
        
    }


    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        Create News
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create</DialogTitle>
                        <DialogDescription>
                            Create.
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
                                    <Button type="submit">Create</Button>
                                </DialogClose>

                            </form>
                        </Form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </>
    )
}