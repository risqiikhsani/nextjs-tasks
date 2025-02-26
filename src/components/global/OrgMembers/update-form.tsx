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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RevalidatePath } from "@/lib/actions";
import { instance } from "@/lib/axios";
import { clientErrorHandler } from "@/lib/error-handler";
import { OrganizationMemberType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  role: z.string(),
});

export default function UpdateForm({ data }: { data: OrganizationMemberType }) {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "",
    },
    values: {
      role: data.role!,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(`Updating class of id : ${data.id}`);
    try {
      console.log(values);
      const formData = new FormData()
      formData.append("role", values.role)
      await instance.put(`/api/org-members/${data.id}`, formData);
      RevalidatePath("/orgs");
      form.reset();
      setOpen(false);
      toast.success("Member updated successfully");
    } catch (error) {
      clientErrorHandler(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <EditIcon />
          Update
        </Button>
      </DialogTrigger>
      <DialogContent
        className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}
      >
        <DialogHeader>
          <DialogTitle>Update Member</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-3xl mx-auto py-10"
          >
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="CREATOR">CREATOR</SelectItem>
                    <SelectItem value="ADMIN">ADMIN</SelectItem>
                    <SelectItem value="MEMBER">MEMBER</SelectItem>
                  </SelectContent>
                </Select>
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
