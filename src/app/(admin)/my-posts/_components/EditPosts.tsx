"use client";

import type React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, Upload, Edit } from "lucide-react";
import { toast } from "sonner";
import { useState, useCallback } from "react";
import Image from "next/image";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";

interface EventFormData {
  name: string;
  description: string;
  date: string;
  buttons: { label: string; url: string; _id?: string }[];
  image?: File;
}

interface EditEventProps {
  event: any;
  onSuccess?: () => void;
}

export default function EditEventSheet({ event, onSuccess }: EditEventProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting },
  } = useForm<EventFormData>({
    defaultValues: {
      name: event.name,
      description: event.description,
      date: new Date(event.date).toISOString().slice(0, 16),
      buttons: event.buttons || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "buttons",
  });

  const handleImageChange = useCallback(
    (file: File) => {
      setValue("image", file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    },
    [setValue]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      const imageFile = files.find((file) => file.type.startsWith("image/"));

      if (imageFile) {
        handleImageChange(imageFile);
      } else {
        toast.error("Please drop an image file");
      }
    },
    [handleImageChange]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleImageChange(file);
      }
    },
    [handleImageChange]
  );

  async function onSubmit(data: EventFormData) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("date", data.date);
    formData.append("buttons", JSON.stringify(data.buttons));

    if (data.image) {
      formData.append("image", data.image);
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/${event._id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      const result = await res.json();
      if (result.success) {
        toast.success("Event updated successfully!");
        onSuccess?.();
        setOpen(false);
      } else {
        toast.error(result.data.message || "Failed to update event");
      }
    } catch (err: any) {
      toast.error("Failed to update event");
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="text-black rounded-full">
          <Edit className="w-4 h-4" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:max-w-lg p-0 flex flex-col"
      >
        {/* Header */}
        <SheetHeader className="p-6 border-b">
          <SheetTitle>Edit Event</SheetTitle>
          <SheetDescription>
            Update event details, image, and action buttons.
          </SheetDescription>
        </SheetHeader>

        {/* Scrollable form content */}
        <div className="flex-1 overflow-y-auto px-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-6">
            <div className="space-y-4">
              <div>
                <Label className="mb-1 font-semibold" htmlFor="name">
                  Event Name
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Enter event name"
                  required
                />
              </div>

              <div>
                <Label className="mb-1 font-semibold" htmlFor="description">
                  Description
                </Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Describe your event"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label className="mb-1 font-semibold" htmlFor="date">
                  Date & Time
                </Label>
                <Input
                  id="date"
                  {...register("date")}
                  type="datetime-local"
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <Label className="mb-1 font-semibold">Event Image</Label>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`
              relative border-2 border-dashed rounded-lg text-center transition-colors cursor-pointer mt-2
              h-40 w-full flex items-center justify-center
              ${
                isDragOver
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-primary/50"
              }
            `}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {imagePreview ? (
                  <Image
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    width={150}
                    height={150}
                    className="object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm">
                      {isDragOver ? "Drop image here" : "Click or drag image"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="mb-1 font-semibold">Action Buttons</Label>
                <Button
                  type="button"
                  variant="outline"
                  className="text-black border border-gray-400 rounded-md hover:text-black hover:border-gray-200"
                  onClick={() => append({ label: "", url: "" })}
                >
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>

              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input
                      {...register(`buttons.${index}.label` as const)}
                      placeholder="Button label"
                      className="flex-1"
                    />
                    <Input
                      {...register(`buttons.${index}.url` as const)}
                      placeholder="https://..."
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => remove(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* Sticky Footer */}
        <SheetFooter className="p-6 border-t">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 text-white bg-black rounded-md hover:text-black hover:bg-gray-200 transition-all ease-in"
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? "Updating..." : "Update Event"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
