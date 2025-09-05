"use client";

import React, { useState } from "react";
import axios from "axios";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface DeleteUserDialogProps {
  userId: string;
  onUserDeleted: () => void;
  userName: string;
}

export default function DeleteUserDialog({
  userId,
  onUserDeleted,
  userName,
}: DeleteUserDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/delete/${userId}`
      );
      if (res.data?.success) {
        toast.success("User deleted successfully");
        onUserDeleted();
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-slate-200 hover:bg-slate-300 text-blue-950 p-2 border border-blue-950/50 rounded-md">
          <Trash2Icon className="w-4 h-4" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-black">
            Delete User
            <span className="px-2 py-0.5 text-xs font-medium uppercase text-white bg-red-600 rounded-full">
              {userName}
            </span>
          </DialogTitle>

          <DialogDescription className="text-left">
            This will permanently remove the user from the system.
            <strong>This action cannot be undone. </strong>
            Are you sure you want to continue?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-4">
          <DialogClose className="text-black text-sm hover:text-black cursor-pointer border-0">
            Cancel
          </DialogClose>
          <Button
            variant="destructive"
            className="hover:bg-red-700 duration-100 transition"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
