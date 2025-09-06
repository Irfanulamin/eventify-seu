"use client";
import { Button } from "@/components/ui/button";
import { Event } from "@/types/events";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

async function getEvents() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/`, {
      cache: "no-store",
    });

    const data = await res.json();
    if (data?.success) {
      return data.data.events;
    }
  } catch (e) {
    console.error(e);
  }

  return [];
}

export default function AllPostsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      setEvents(await getEvents());
    })();
  }, []);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };
  return (
    <div className="flex flex-col gap-4">
      {events.map((event: Event) => {
        const eventDate = formatDate(event.date);

        return (
          <article
            key={event._id}
            className="flex flex-col sm:flex-row bg-background border-2 border-border rounded-lg overflow-hidden"
          >
            {/* Image + Date */}
            <div className="relative w-full sm:w-32 h-48 sm:h-32 flex-shrink-0 m-3">
              <Image
                src={event.imageUrl || "/placeholder.svg"}
                alt={event.name}
                fill
                className="object-cover rounded-md"
              />
              <div className="absolute top-2 left-2 bg-background/95 rounded-md px-2 py-1 border-gray-100 border">
                <div className="text-center">
                  <div className="text-sm font-bold text-foreground">
                    {eventDate.day}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase">
                    {eventDate.month}
                  </div>
                </div>
              </div>
            </div>

            {/* Event Info */}
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap sm:flex-nowrap">
                  <div className="w-6 h-6 relative rounded-full overflow-hidden">
                    <Image
                      src={event.club.imageUrl || "/placeholder.svg"}
                      alt={event.club.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {event.club.name}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(
                      event.createdBy.createdAt as string
                    ).toLocaleString()}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-foreground text-balance leading-tight mb-2">
                  {event.name}
                </h2>

                <p className="text-sm text-muted-foreground text-pretty line-clamp-2 mb-3">
                  {event.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {event.buttons &&
                  event.buttons.map((button, index) => (
                    <Button
                      key={button._id}
                      variant={index === 0 ? "default" : "outline"}
                      className={`
                    ${
                      index === 0
                        ? "bg-black text-white hover:text-black"
                        : "border-foreground text-foreground"
                    }
                    text-sm
                  `}
                      asChild
                    >
                      <a
                        href={button.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        {button.label}
                      </a>
                    </Button>
                  ))}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
