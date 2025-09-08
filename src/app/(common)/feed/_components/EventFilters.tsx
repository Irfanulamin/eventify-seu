"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchIcon, SortAscIcon, XIcon } from "lucide-react";

interface EventFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedClub: string;
  setSelectedClub: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  clubs: string[];
  filteredEventsCount: number;
  clearFilters: () => void;
}

export default function EventFilters({
  searchTerm,
  setSearchTerm,
  selectedClub,
  setSelectedClub,
  sortBy,
  setSortBy,
  clubs,
  filteredEventsCount,
  clearFilters,
}: EventFiltersProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 lg:sticky lg:top-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">
        Filter Events
      </h2>

      <div className="space-y-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search events or clubs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10 bg-slate-50 border-slate-200 rounded-lg text-sm"
          />
        </div>

        <Select value={selectedClub} onValueChange={setSelectedClub}>
          <SelectTrigger className="w-full h-10 bg-slate-50 border-slate-200 rounded-lg text-sm">
            <SelectValue placeholder="Select club" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Clubs</SelectItem>
            {clubs.map((club) => (
              <SelectItem key={club} value={club}>
                {club}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <SortAscIcon className="h-4 w-4 text-slate-500" />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full h-9 bg-slate-50 border-slate-200 rounded-lg text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Sort by Date</SelectItem>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="club">Sort by Club</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(searchTerm || selectedClub !== "all") && (
          <Button
            variant="outline"
            onClick={clearFilters}
            className="w-full h-9 text-slate-600 border-slate-200 rounded-lg bg-transparent text-sm"
          >
            <XIcon className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        )}

        <div className="text-sm text-slate-500 text-center pt-2 border-t border-slate-200">
          {filteredEventsCount} event{filteredEventsCount !== 1 ? "s" : ""}{" "}
          found
        </div>
      </div>
    </div>
  );
}
