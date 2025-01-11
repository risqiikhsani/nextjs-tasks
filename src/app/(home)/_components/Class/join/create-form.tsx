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
import { Input } from "@/components/ui/input";
import { RevalidatePath } from "@/lib/actions";
import { instance } from "@/lib/axios";
import { useDataStore } from "@/stores/data";
import { ClassType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  password: z.string(),
});

export default function CreateForm({ data }: { data: ClassType }) {
  const [enrolled, setEnrolled] = useState(false);

  const { enrollments } = useDataStore((state) => state);

  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("password", values.password);
    try {
      await instance.post(`/api/enrollments?class_id=${data.id}`, formData);
      RevalidatePath("/classes");
      setOpen(false);
      toast.success("Enrolled successfully");
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed, Wrong Password or something wrong.");
    }
  }

  useEffect(() => {
    // check if user enrolled in this class
    if (enrollments?.find((enrollment) => enrollment.classId === data.id)) {
      setEnrolled(true);
    }
  }, [enrollments, data]);

  return (
    <div>
      {enrolled ? (
        <div>
          <Button disabled>
            Enrolled <CheckCircleIcon className="text-green-500" />
          </Button>
        </div>
      ) : (
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Enroll</Button>
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
                  {data.is_password && (
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="shadcn"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {!data.is_password && "Password is not needed for enroll"}
                  <FormSubmitButton
                    loading={form.formState.isSubmitting}
                    text="Enroll"
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
