"use client";

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
import { ClassEnrollmentType } from "@/types/types";

export default function DeleteForm({ data }: { data: ClassEnrollmentType }) {
  const [open, setOpen] = useState(false);
  const onDelete = async () => {
    try {
      await instance.delete(`/api/enrollments/${data.id}`);
      setOpen(false);
      RevalidatePath("/classes");
      toast.success("Enrollment deleted successfully");
    } catch (error) {
      console.error("Delete error", error);
      toast.error("Failed to delete the enrollment. Please try again.");
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <DeleteIcon className="text-red-500"/>
            Remove
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently remove this
              data from our servers.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={onDelete}>Delete</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
