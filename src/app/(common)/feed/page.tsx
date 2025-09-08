"use client";

import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import EventCard from "./_components/EventCard";
import EventFilters from "./_components/EventFilters";
import { SearchIcon } from "lucide-react";

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
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClub, setSelectedClub] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          "https://api.eventifyseu.online/api/events"
        );
        setEvents(res.data.data.events || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const clubs = useMemo(
    () => Array.from(new Set(events.map((event) => event.club.name))),
    [events]
  );

  const filteredEvents = useMemo(() => {
    const filtered = events.filter((event) => {
      const matchesSearch =
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.club.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesClub =
        selectedClub === "all" || event.club.name === selectedClub;

      return matchesSearch && matchesClub;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "name":
          return a.name.localeCompare(b.name);
        case "club":
          return a.club.name.localeCompare(b.club.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [events, searchTerm, selectedClub, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedClub("all");
    setSortBy("date");
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="lg:flex mx-auto px-4 py-6 lg:gap-6">
        <aside className="lg:w-72 lg:flex-shrink-0 mb-6 lg:mb-0 lg:order-2">
          <EventFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedClub={selectedClub}
            setSelectedClub={setSelectedClub}
            sortBy={sortBy}
            setSortBy={setSortBy}
            clubs={clubs}
            filteredEventsCount={filteredEvents.length}
            clearFilters={clearFilters}
          />
        </aside>

        <section className="flex-1 lg:order-1">
          {loading ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
              <p className="text-slate-500">Loading events...</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
              <SearchIcon className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                No events found
              </h3>
              <p className="text-slate-500">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
