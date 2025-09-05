"use client";

import {
  useForm,
  type SubmitHandler,
  type FieldValues,
  Controller,
} from "react-hook-form";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { useState } from "react";

interface AddUserFormProps {
  onUserCreated: () => void;
}

interface FieldConfig {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  validation?: any;
  isPassword?: boolean;
}

const registerFields: FieldConfig[] = [
  {
    name: "username",
    label: "Username",
    type: "text",
    placeholder: "Choose username",
    validation: {
      required: "Username is required",
      minLength: {
        value: 3,
        message: "Username must be at least 3 characters",
      },
      pattern: {
        value: /^[a-zA-Z0-9_]+$/,
        message: "Username can only contain letters, numbers, and underscores",
      },
    },
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter email",
    validation: {
      required: "Email is required",
      pattern: { value: /^\S+@\S+$/i, message: "Please enter a valid email" },
    },
  },
  {
    name: "password",
    label: "Password",
    type: "text",
    placeholder: "Create password",
    validation: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters",
      },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        message: "Password must contain uppercase, lowercase, and number",
      },
    },
    isPassword: true,
  },
];

const roles = ["user", "admin", "super-admin"];

export default function AddUserForm({ onUserCreated }: AddUserFormProps) {
  const [open, setOpen] = useState(false); // control sheet open/close
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { role: "user" } });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/create-user`,
        data
      );

      if (response.data.success) {
        toast.success("User created successfully!");
        setOpen(false);
        reset();
        onUserCreated();
      } else {
        toast.error("Failed to create user");
      }
    } catch (error) {
      toast.error("An error occurred while creating the user.");
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="text-white w-full md:w-auto bg-blue-950 hover:bg-blue-900 transition duration-300 flex items-center gap-2 rounded-md">
          <Plus className="w-4 h-4" /> Add User
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create User</SheetTitle>
          <SheetDescription>
            Add a new user to Eventify SEU with a role and login credentials.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4 px-6">
          {registerFields.map((field) => (
            <div key={field.name} className="flex flex-col space-y-2">
              <Label className="text-black font-medium text-sm mb-1">
                {field.label}
              </Label>
              <Input
                type={field.type}
                placeholder={field.placeholder}
                {...register(field.name, field.validation)}
                className="text-black"
              />
              {errors[field.name]?.message && (
                <p className="text-red-500 text-sm">
                  {errors[field.name]?.message as string}
                </p>
              )}
            </div>
          ))}

          {/* Role Radio Group */}
          <div className="flex flex-col space-y-2 mb-4">
            <Label className="text-black font-medium text-sm mb-1">Role</Label>
            <Controller
              name="role"
              control={control}
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-4"
                >
                  {roles.map((role) => (
                    <div key={role} className="flex items-center space-x-2">
                      <RadioGroupItem value={role} id={role} />
                      <Label htmlFor={role} className="text-black">
                        {role.charAt(0).toUpperCase() +
                          role.slice(1).replace("-", " ")}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            {errors.role?.message && (
              <p className="text-red-500 text-sm">
                {errors.role?.message as string}
              </p>
            )}
          </div>

          <Button
            variant="secondary"
            type="submit"
            className="text-white bg-blue-950 hover:bg-blue-900 duration-300 transition w-full"
          >
            Create User
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
