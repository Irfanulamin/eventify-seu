"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Calendar, Users, MapPin } from "lucide-react"; // icons from lucide

interface EventButton {
  _id: string;
  label: string;
  url: string;
}

interface Club {
  _id: string;
  name: string;
  imageUrl: string;
}

interface Event {
  _id: string;
  name: string;
  imageUrl: string;
  description: string;
  date: string;
  buttons: EventButton[];
  club: Club;
  attendeeCount?: number;
  location?: string;
}

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const [expanded, setExpanded] = useState(false);

  const desc = event.description || "";
  const isLong = desc.length > 20;
  const preview = isLong ? desc.slice(0, 20) + "..." : desc;

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      {/* Image only */}
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <Image
          src={event.imageUrl}
          alt={event.name || "Event"}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-black text-balance">
          {event.name || "Untitled Event"}
        </h2>

        {/* Club + Date Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {event.club?.name && (
            <div className="flex items-center gap-2">
              {event.club?.imageUrl && (
                <Image
                  src={event.club.imageUrl}
                  alt={event.club.name}
                  width={20}
                  height={20}
                  className="rounded-full object-cover"
                />
              )}
              <span>{event.club.name}</span>
            </div>
          )}
          {event.date && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-black" />
              <span>
                {new Date(event.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                })}
              </span>
            </div>
          )}
        </div>

        {/* Description with toggle */}
        <div>
          <p className="text-muted-foreground break-words">
            {expanded ? desc : preview || "No description available."}{" "}
            {isLong && (
              <span
                onClick={() => setExpanded((prev) => !prev)}
                className="text-blue-600 hover:underline text-sm font-medium cursor-pointer"
              >
                {expanded ? "See less" : "See more"}
              </span>
            )}
          </p>
        </div>

        {/* Buttons */}
        {event.buttons && event.buttons.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {event.buttons.map((btn) => (
              <Button
                key={btn._id}
                asChild
                variant="default"
                className="bg-black text-white hover:text-black"
              >
                <a href={btn.url} target="_blank" rel="noopener noreferrer">
                  {btn.label}
                </a>
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
