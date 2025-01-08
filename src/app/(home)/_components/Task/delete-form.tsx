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
        console.error("Delete error", error);
        toast.error("Failed to delete the task. Please try again.");
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <Button variant="outline"><DeleteIcon/>Delete</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently remove this data from our servers.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={onDelete}>Delete</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
