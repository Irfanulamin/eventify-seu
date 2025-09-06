"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { Calendar, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

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
    <div>
      <button
        onClick={fetchEvents}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        Refresh
      </button>

      {events.map((event) => (
        <Card key={event._id} className="w-full max-w-2xl mx-auto">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={event.club.imageUrl || "/placeholder.svg"}
                  alt={event.club.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{event.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {event.club.name}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="p-2">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Event Image */}
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
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
            <p className="text-sm leading-relaxed">{event.description}</p>

            {/* Action Buttons */}
            {event.buttons.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {event.buttons.map((button: any) => (
                  <Button key={button._id} variant="default" size="sm" asChild>
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

            {/* Event Meta */}
            <div className="flex items-center justify-between pt-4 border-t text-xs text-muted-foreground">
              <span>By {event.createdBy.username}</span>
              <span>{new Date(event.createdAt).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
