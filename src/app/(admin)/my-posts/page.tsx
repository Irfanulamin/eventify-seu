"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { Calendar, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import EditEventForm from "./_components/EditPosts";
import DeletePost from "./_components/DeletePost";

export default function EventPageEditDeletePage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch events from backend
  const fetchEvents = async () => {
    if (!user?.id) return; // make sure user exists
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/creator/${user.id}`,
        {
          cache: "no-store",
        }
      );
      const data = await res.json();
      if (data?.success) {
        setEvents(data.data.events);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  // Run once when component mounts or when user.id changes
  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div className="px-2">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card
            key={event._id}
            className="flex flex-col w-full overflow-hidden rounded-2xl shadow-sm border transition"
          >
            {/* Card Header */}
            <CardHeader className="pb-3 border-b bg-muted/30">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src={event.club.imageUrl || "/placeholder.svg"}
                    alt={event.club.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover border"
                  />
                  <div>
                    <h3 className="font-semibold text-lg line-clamp-1">
                      {event.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {event.club.name}
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <EditEventForm event={event} onSuccess={fetchEvents} />

                  <DeletePost event={event} onSuccess={fetchEvents} />
                </div>
              </div>
            </CardHeader>

            {/* Card Content */}
            <CardContent className="flex flex-col flex-1 p-4">
              {/* Main Content Wrapper */}
              <div className="flex flex-col flex-1 space-y-4">
                {/* Event Image */}
                <div className="relative w-full h-48 sm:h-56 md:h-40 lg:h-44 xl:h-52 rounded-lg overflow-hidden">
                  <Image
                    src={event.imageUrl || "/placeholder.svg"}
                    alt={event.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Event Date */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(event.date)}</span>
                </div>

                {/* Event Description */}
                <p className="text-sm leading-relaxed line-clamp-3">
                  {event.description}
                </p>

                {/* Action Buttons */}
                {event.buttons.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {event.buttons.map((button: any) => (
                      <Button
                        key={button._id}
                        variant="secondary"
                        size="sm"
                        asChild
                        className="rounded-full"
                      >
                        <a
                          href={button.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {button.label}
                        </a>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-auto flex items-end justify-end pt-4 text-xs text-muted-foreground space-x-2">
                <span>By {event.createdBy.username}</span>
                <span>{new Date(event.createdAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
