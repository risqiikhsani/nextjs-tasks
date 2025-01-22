"use client";
import FormSubmitButton from "@/components/form-submit-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Textarea } from "@/components/ui/textarea";
import { RevalidatePath } from "@/lib/actions";
import { instance } from "@/lib/axios";
import { clientErrorHandler } from "@/lib/error-handler";
import { useDataStore } from "@/stores/data";
import { OrganizationType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  message: z.string(),
});

export default function CreateForm({ data }: { data: OrganizationType }) {
  const [joined, setJoined] = useState(false);

  const { orgs } = useDataStore((state) => state);

  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("message", values.message);
    
    try {
      await instance.post(
        `/api/org-join-requests?organization_id=${data.id}`,
        formData
      );
      RevalidatePath("/orgs");
      setOpen(false);
      toast.success("Request to join sent successfully");
    } catch (error: any) {
      clientErrorHandler(error)
    }
  }

  useEffect(() => {
    // check if user joined in this class
    if (orgs?.find((org) => org.orgId === data.id)) {
      setJoined(true);
    }
  }, [orgs, data]);

  return (
    <div>
      {joined ? (
        <div className="flex gap-2 text-sm items-center">
          joined <CheckCircleIcon className="text-green-500" />
        </div>
      ) : (
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Join Organization</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Enroll Class</DialogTitle>
                <DialogDescription>Enroll to this class</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 max-w-3xl mx-auto py-10 flex flex-col gap-2"
                >
                  {data && (
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="your message to organization's admin"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <FormSubmitButton
                    loading={form.formState.isSubmitting}
                    text="Join"
                  />
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
