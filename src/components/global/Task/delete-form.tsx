"use client"

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { instance } from "@/lib/axios";
import { toast } from "sonner";
import { RevalidatePath } from "@/lib/actions";
import { DeleteIcon } from "lucide-react";
import { Task as TaskType} from "@prisma/client";
import ConfirmDeletion from "@/components/confirm-deletion";
import { clientErrorHandler } from "@/lib/error-handler";

export default function DeleteForm({ data }: { data: TaskType }) {
    const [open, setOpen] = useState(false);
  const onDelete = async () => {
    try {
        await instance.delete(`/api/tasks/${data.id}`);
        setOpen(false)
        RevalidatePath("/classes");
        RevalidatePath("/courses");
        toast.success("Task deleted successfully");
    } catch (error) {
      clientErrorHandler(error)
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <Button variant="destructive"><DeleteIcon/>Delete</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently remove this data from our servers.
            </DialogDescription>
          </DialogHeader>
          <ConfirmDeletion label="task name" confirmation_string={data.name} onDelete={onDelete}/>
        </DialogContent>
      </Dialog>
    </div>
  );
}
