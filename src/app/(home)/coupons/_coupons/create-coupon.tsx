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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from 'sonner';
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { UploadButton } from "@/utils/uploadthing"
import { useState } from "react"
import Image from "next/image"
import { categories } from "@/constants/categories"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"


const formSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(200),
    category: z.string(),
    code: z.string(),
    expiredTime: z.date({
        required_error: "A date of expire time is required.",
    }),
    amount: z.coerce.number().min(1),
})



export default function CreateCoupon() {
    const router = useRouter()
    const [imageUrl, setImageUrl] = useState("")

    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            category: "",
            code: "",
            expiredTime: threeDaysFromNow,
            amount: 10
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
        const response = await fetch(`/api/coupon`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newValues)
        });

        if (response.ok) {
            console.log("coupon created successfully");
            form.reset();
            setImageUrl("");
            router.refresh()
            toast.success('Created Successfully');
        }
        else {
            console.log("Error creating coupon");
            form.reset();
            setImageUrl("");
        }
    }

    const generateRandomCode = (e: React.MouseEvent<HTMLButtonElement>) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 8; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        form.setValue('code', code);
    }


    return (
        <>
        
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">
                        Create Coupon
                    </Button>
                </DialogTrigger>
                
                <DialogContent className="overflow-y-scroll max-h-screen">
                    <DialogHeader>
                        <DialogTitle>Create coupon</DialogTitle>
                        <DialogDescription>
                            Create a new Coupon.
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
                                                <Input placeholder="name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Description about the coupon"
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>coupon category</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a category for use" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {categories.map((a, i) =>
                                                        <SelectItem key={i} value={a}>{a}</SelectItem>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>code</FormLabel>
                                            <FormControl>
                                                <Input placeholder="code" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="button" onClick={generateRandomCode}>Generate random coupon code</Button>
                                <FormField
                                    control={form.control}
                                    name="amount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>amount</FormLabel>
                                            <FormControl>
                                                <Input placeholder="amount" {...field} type="number" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="expiredTime"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>expire time</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-[240px] pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date > new Date() || date < new Date("1900-01-01")
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormDescription>
                                                Select a date to expire the coupon. or default is 3 days
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