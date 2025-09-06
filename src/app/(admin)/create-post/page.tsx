"use client";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import axios from "axios";
import {
  Calendar,
  Upload,
  X,
  Plus,
  Link,
  Tag,
  Building2,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Image from "next/image";
import { useAuth } from "@/hooks/use-auth";

interface ButtonField {
  label: string;
  url: string;
}

interface EventFormData {
  name: string;
  description: string;
  date: string;
  clubId: string;
  buttons?: ButtonField[];
}

interface Club {
  _id: string;
  name: string;
}

export default function CreateEventForm() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [isLoadingClubs, setIsLoadingClubs] = useState(true);
  const { user } = useAuth();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<EventFormData>({
    defaultValues: {
      name: "",
      description: "",
      date: "",
      clubId: "",
      buttons: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "buttons",
  });

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/clubs`
        );
        if (response.data.success) setClubs(response.data.data.clubs);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load clubs. Please refresh.");
      } finally {
        setIsLoadingClubs(false);
      }
    };
    fetchClubs();
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
    maxFiles: 1,
    onDrop: (files) => {
      const file = files[0];
      if (file) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(file);
      }
    },
  });

  const addButton = () => append({ label: "", url: "" });

  const validateFutureDate = (value: string) => {
    const date = new Date(value);
    return date > new Date() || "Event date must be in the future";
  };

  const onSubmit = async (data: EventFormData) => {
    if (!imageFile) return toast.error("Please select an image");
    if (!user) return toast.error("You must be logged in to create an event");

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("date", data.date);
      formData.append("club", data.clubId);
      formData.append("createdBy", user?.id);

      if (imageFile) formData.append("image", imageFile);

      formData.append("buttons", JSON.stringify(data.buttons));

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Event created successfully!");
        reset();
        setImageFile(null);
        setImagePreview(null);
      } else {
        toast.error(response.data.message || "Failed to create event");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create event");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="shadow py-6 p-4 space-y-6 bg-gray-50 rounded-md">
      <h2 className="text-2xl font-semibold">Create New Event</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <Label htmlFor="name" className="text-sm font-medium mb-1">
            Event Name
          </Label>
          <Input
            {...register("name", {
              required: "Event name is required",
              maxLength: { value: 100, message: "Max 100 chars" },
              validate: (v) => v.trim() !== "" || "Cannot be empty",
            })}
            id="name"
            placeholder="Enter event name"
            className="h-10"
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="description" className="text-sm font-medium mb-1">
            Description
          </Label>
          <div className="relative">
            <Textarea
              {...register("description", {
                required: "Description required",
                minLength: { value: 50, message: "Min 50 chars" },
                maxLength: { value: 500, message: "Max 500 chars" },
              })}
              id="description"
              placeholder="Enter event description"
              className="min-h-[80px] pl-8"
            />
            <FileText className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          {errors.description && (
            <p className="text-xs text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div>
            <Label htmlFor="date" className="text-sm font-medium mb-1">
              Event Date
            </Label>
            <div className="relative">
              <Input
                {...register("date", {
                  required: "Event date required",
                  validate: validateFutureDate,
                })}
                id="date"
                type="datetime-local"
                className="h-10 pl-8"
              />
              <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            {errors.date && (
              <p className="text-xs text-destructive">{errors.date.message}</p>
            )}
          </div>

          <div>
            <Label className="text-sm font-medium mb-1">Select Club</Label>
            <div className="relative">
              <Controller
                name="clubId"
                control={control}
                rules={{ required: "Club selection required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-12 pl-8">
                      <SelectValue
                        placeholder={
                          isLoadingClubs ? "Loading..." : "Select a club"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {clubs.map((club) => (
                        <SelectItem key={club._id} value={club._id}>
                          {club.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <Building2 className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            {errors.clubId && (
              <p className="text-xs text-destructive">
                {errors.clubId.message}
              </p>
            )}
          </div>
        </div>

        {/* Image */}
        <div>
          <Label className="text-sm font-medium mb-1">Event Image</Label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer duration-100 transition-all ${
              isDragActive
                ? "border-gray-800 bg-gray-border-gray-800/5"
                : "border-muted-foreground/25 hover:border-gray-800/50"
            }`}
          >
            <input {...getInputProps()} />
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Preview"
                width={400}
                height={200}
                className="mx-auto rounded-lg object-cover"
              />
            ) : (
              <div className="space-y-2">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {isDragActive
                    ? "Drop image here"
                    : "Drag & drop or click to select"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div>
          <Label className="text-sm font-semibold mb-1">Event Buttons</Label>
          <Button
            type="button"
            variant="outline"
            onClick={addButton}
            className="text-black border border-gray-400 rounded-md hover:text-black hover:border-gray-200"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Button
          </Button>

          {fields.map((field, index) => (
            <div key={field.id} className="p-3 border rounded mb-2 bg-muted/10">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium mb-1">Button {index + 1}</p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                  className="h-6 w-6 p-0 text-destructive"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="relative">
                  <Input
                    {...register(`buttons.${index}.label` as const, {
                      required: "Label required",
                      maxLength: { value: 10, message: "Max 10 chars" },
                    })}
                    placeholder="Label e.g., Register"
                    className="h-8 pl-7"
                  />
                  <Tag className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  {errors.buttons?.[index]?.label && (
                    <p className="text-xs text-destructive">
                      {errors.buttons[index]?.label?.message}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <Input
                    {...register(`buttons.${index}.url` as const, {
                      pattern: {
                        value: /^$|^https?:\/\/.+/,
                        message: "Invalid URL",
                      },
                    })}
                    placeholder="Enter URL"
                    className="h-8 pl-7"
                  />
                  <Link className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  {errors.buttons?.[index]?.url && (
                    <p className="text-xs text-destructive">
                      {errors.buttons[index]?.url?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting || isLoadingClubs}
          className="w-full h-11 text-white bg-black rounded-md hover:text-black hover:bg-gray-200 transition-all ease-in"
        >
          {isSubmitting ? "Creating Event..." : "Create Event"}
        </Button>
      </form>
    </section>
  );
}
