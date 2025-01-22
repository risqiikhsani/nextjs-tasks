"use client"

import ConfirmDeletion from "@/components/confirm-deletion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RevalidatePath } from "@/lib/actions";
import { instance } from "@/lib/axios";
import { clientErrorHandler } from "@/lib/error-handler";
import { ClassType } from "@/types/types";
import { DeleteIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteForm({ data }: { data: ClassType }) {
    const [open, setOpen] = useState(false);
  const onDelete = async () => {
    try {
        await instance.delete(`/api/classes/${data.id}`);
        setOpen(false)
        RevalidatePath("/classes");
        toast.success("Class deleted successfully");
    } catch (error) {
      clientErrorHandler(error)
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <Button variant="destructive" ><DeleteIcon/>Delete</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently remove this data from our servers.
            </DialogDescription>
          </DialogHeader>
          <ConfirmDeletion label="class name" confirmation_string={data.name} onDelete={onDelete}/>
        </DialogContent>
      </Dialog>
    </div>
  );
}
