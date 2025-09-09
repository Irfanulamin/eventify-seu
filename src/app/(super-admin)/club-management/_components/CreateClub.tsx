"use client";

import type React from "react";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, ImageIcon, CircleFadingPlus, PlusIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

interface ClubFormValues {
  name: string;
  description: string;
  fbLink: string;
  image: File | null;
}

export default function CreateClubForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ClubFormValues>();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setSelectedFile(file);
        setValue("image", file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    multiple: false,
    maxSize: 5 * 1024 * 1024,
  });

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setValue("image", null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  const onSubmit = async (data: ClubFormValues) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("fbLink", data.fbLink);
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/clubs/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Club created successfully!");
      reset();
      setSelectedFile(null);
      setPreviewUrl(null);
      setOpen(false);
      onSuccess();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create club");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="info" size="sm">
          <PlusIcon className="h-4 w-4" />
          Create Club
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="space-y-1">
          <SheetTitle className="text-xl">Create a New Club</SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Fill in the details below to create your club
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6 px-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Club Name
            </Label>
            <Input
              id="name"
              placeholder="Enter club name"
              className="h-10"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter club description"
              className="h-10"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 5,
                  message: "Description must be at least 5 characters",
                },
                maxLength: {
                  value: 300,
                  message: "Description must be within 100 characters",
                },
              })}
            />
            {errors.description && (
              <p className="text-xs text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Facebook Link */}
          <div className="space-y-2">
            <Label htmlFor="fbLink" className="text-sm font-medium">
              Facebook Link
            </Label>
            <Input
              id="fbLink"
              placeholder="https://facebook.com/your-club"
              className="h-10"
              {...register("fbLink", {
                required: "Facebook link is required",
                pattern: {
                  value: /^https?:\/\/(www\.)?facebook\.com\/.+$/,
                  message: "Enter a valid Facebook link",
                },
              })}
            />
            {errors.fbLink && (
              <p className="text-xs text-destructive">
                {errors.fbLink.message}
              </p>
            )}
          </div>

          {/* Image Upload Dropzone */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Club Image</Label>

            {!selectedFile ? (
              <div
                {...getRootProps()}
                className={`
                  border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                  ${
                    isDragActive
                      ? "border-primary bg-primary/5"
                      : "border-muted-foreground/25 hover:border-muted-foreground/50"
                  }
                `}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-2">
                  <div className="rounded-full bg-muted p-3">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {isDragActive
                        ? "Drop your image here"
                        : "Upload club image"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Drag & drop or click to browse (Max 5MB)
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative rounded-lg border bg-muted/30 p-4">
                <div className="flex items-center gap-3">
                  {previewUrl ? (
                    <Image
                      height={400}
                      width={400}
                      src={previewUrl || "/placeholder.svg"}
                      alt="Preview"
                      className="h-12 w-12 rounded object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded bg-muted">
                      <ImageIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    className="h-8 w-8 p-0 hover:bg-destructive/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {errors.image && (
              <p className="text-xs text-destructive">Image is required</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading || !selectedFile}
            className="text-white bg-blue-950 hover:bg-blue-900 duration-300 transition w-full rounded-md"
          >
            {loading ? "Creating..." : "Create Club"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
