"use client";

import axios from "axios";
import { useState } from "react";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface DeleteClubProps {
  clubData: {
    _id: string;
    name: string;
  };
  onSuccess: () => void;
}

export default function DeleteClubDialog({
  clubData,
  onSuccess,
}: DeleteClubProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/clubs/delete/${clubData._id}`
      );

      toast.success(`${clubData.name} has been deleted.`);
      setOpen(false);
      onSuccess();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete club");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex-1">
          Delete <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-black">
            Delete Club
            <span className="px-2 py-0.5 text-xs font-medium uppercase text-white bg-red-600 rounded-full">
              {clubData?.name}
            </span>
          </DialogTitle>

          <DialogDescription className="text-left">
            This will permanently remove the user from the system.
            <strong>This action cannot be undone. </strong>
            Are you sure you want to continue?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-4 justify-end">
          <DialogClose
            onClick={() => setOpen(false)}
            disabled={loading}
            className="text-black text-sm hover:text-black/50 cursor-pointer border-0 transition-all duration-200"
          >
            Cancel
          </DialogClose>
          <Button
            variant="destructive"
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
