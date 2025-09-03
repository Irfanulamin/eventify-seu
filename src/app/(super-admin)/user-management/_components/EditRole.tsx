"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Edit2Icon } from "lucide-react";
import { toast } from "sonner";

interface EditUserDialogProps {
  user: {
    _id: string;
    username: string;
    email: string;
    role: "user" | "admin" | "super-admin";
  };
  onRoleUpdated: () => void;
}

interface FormValues {
  role: "user" | "admin" | "super-admin";
}

export default function EditUserDialog({
  user,
  onRoleUpdated,
}: EditUserDialogProps) {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: { role: user.role },
  });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      await axios.patch(`http://localhost:5000/api/users/${user._id}/role`, {
        userId: user._id,
        role: data.role,
      });
      toast.success("Role has been updated successfully!");
      onRoleUpdated();
      setOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="bg-slate-200 hover:bg-slate-300 text-blue-950 p-2 border border-blue-950/50 inline-block rounded-md">
          <Edit2Icon className="w-4 h-4" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-black">Edit User Role</DialogTitle>
          <DialogDescription className="text-gray-600">
            Update the role assigned to this user to manage their access and
            permissions.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              Username
            </label>
            <input
              type="text"
              value={user.username}
              disabled
              className="w-full border rounded-md px-2 py-1 bg-gray-100 text-black"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full border rounded-md px-2 py-1 bg-gray-100 text-black"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              Role
            </label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-4"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="user" id="role-user" />
                    <label className="text-black">User</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="admin" id="role-admin" />
                    <label className="text-black">Admin</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="super-admin" id="role-super-admin" />
                    <label className="text-black">Super Admin</label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="text-white bg-blue-950 hover:bg-blue-900 duration-300 transition w-full rounded-md"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Role"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
