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
const formSchema = z.object({
    title: z.string().min(2).max(50),
    content: z.string().min(2).max(50),
})



export default function CreatePost() {
    const router = useRouter()
    const [imageUrl,setImageUrl] = useState("")
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const newValues = {
            ...values,
            image: imageUrl}

        console.log(newValues)
        const response = await fetch(`/api/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newValues)
        });

        if (response.ok) {
            console.log("Post created successfully");
            form.reset();
            setImageUrl("");
            router.refresh()
            toast.success('Created Successfully');
        }
        else {
            console.log("Error creating post");
            form.reset();
            setImageUrl("");
        }
    }


    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        Create Post
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Post</DialogTitle>
                        <DialogDescription>
                            Create a new post.
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
                                            <FormDescription>
                                                This is the title of the post
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>content</FormLabel>
                                            <FormControl>
                                                <Input placeholder="content" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                This is the content of the post
                                            </FormDescription>
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
                                {imageUrl && <Image src={imageUrl} alt="image" width="200" height="200"/>}
                                
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