"use client";
import FormSubmitButton from "@/components/form-submit-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RevalidatePath } from "@/lib/actions";
import { instance } from "@/lib/axios";
import { clientErrorHandler } from "@/lib/error-handler";
import { zodResolver } from "@hookform/resolvers/zod";
import { Course as CourseType } from "@prisma/client";
import { EditIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export default function UpdateForm({ data }: { data: CourseType }) {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
    values: {
      name: data.name!,
      description: data.description!,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(`Updating course of id : ${data.id}`);
    try {
      console.log(values);
      const formData = new FormData()
      formData.append("name", values.name) 
      formData.append("description", values.description)
      await instance.put(`/api/courses/${data.id}`, formData);
      RevalidatePath("/classes");
      form.reset();
      setOpen(false);
      toast.success("Course updated successfully");
    } catch (error) {
      clientErrorHandler(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <EditIcon />
          Update
        </Button>
      </DialogTrigger>
      <DialogContent
        className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}
      >
        <DialogHeader>
          <DialogTitle>Update Course</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-3xl mx-auto py-10"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="text" {...field} />
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
                    <Textarea placeholder="" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormSubmitButton loading={form.formState.isSubmitting} />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
