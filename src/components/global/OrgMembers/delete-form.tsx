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
import { OrganizationMemberType } from "@/types/types";
import { clientErrorHandler } from "@/lib/error-handler";

export default function DeleteForm({ data }: { data: OrganizationMemberType }) {
  const [open, setOpen] = useState(false);
  const onDelete = async () => {
    try {
      await instance.delete(`/api/org-members/${data.id}`);
      setOpen(false);
      RevalidatePath("/users");
      toast.success("Member deleted successfully");
    } catch (error) {
      clientErrorHandler(error)
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
