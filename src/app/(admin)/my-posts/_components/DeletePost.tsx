import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteEventProps {
  event: { _id: string; name: string };
  onSuccess?: () => void;
}

export default function DeletePost({ event, onSuccess }: DeleteEventProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/delete/${event._id}`
      );

      toast.success(`${event?.name} has been deleted.`);
      setOpen(false);
      onSuccess?.();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-black rounded-full">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-black">
            Delete Event
            <span className="px-2 py-0.5 text-xs font-medium uppercase text-white bg-red-600 rounded-full">
              {event?.name}
            </span>
          </DialogTitle>
          <DialogDescription className="text-left">
            This will permanently remove the event from the system.
            <strong>This action cannot be undone.</strong> Are you sure you want
            to continue?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-4 justify-end">
          <DialogClose
            onClick={() => setOpen(false)}
            disabled={loading}
            className="text-black text-sm hover:text-black cursor-pointer border-0"
          >
            Cancel
          </DialogClose>

          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
            className="hover:bg-red-700 duration-100 transition"
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
