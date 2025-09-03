"use client";
import React, { useEffect, useState } from "react";
import CreateClubForm from "./_components/CreateClub";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";

// ✅ Define interface for Club
interface Club {
  _id: string;
  name: string;
  description: string;
  fbLink: string;
  imageUrl?: string;
}

// ✅ Fetch clubs with type
async function getClubs(): Promise<Club[]> {
  try {
    const res = await fetch("http://localhost:5000/api/clubs/", {
      cache: "no-store",
    });
    const data = await res.json();
    if (data?.success) return (data.data?.clubs as Club[]) || [];
  } catch (e) {
    console.error(e);
  }
  return [];
}

export default function ClubManagementPage() {
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    const fetchedUsers = await getClubs();
    setClubs(fetchedUsers);
  };

  return (
    <>
      <CreateClubForm />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {clubs.map((club) => (
          <Card
            key={club._id}
            className="relative w-full h-96 bg-white/10 border border-white/20 shadow transition-all duration-300 rounded-xl p-0 flex flex-col"
          >
            <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
              <Image
                src={
                  club?.imageUrl ||
                  "/placeholder.svg?height=192&width=320&query=modern club image"
                }
                alt={club?.name}
                fill
                className="object-cover transition-transform duration-300"
              />
            </div>

            <div className="px-6 py-4 bg-gradient-to-b from-white/5 to-white/10 flex flex-col justify-between flex-1">
              <div className="flex flex-col gap-2 text-left">
                <h3 className="text-xl font-semibold text-blue-900 leading-tight">
                  {club.name}
                </h3>
                <p className="text-sm text-blue-900/80 leading-relaxed line-clamp-2">
                  {club.description}
                </p>
              </div>

              <Button
                asChild
                className="mt-4 w-full bg-blue-500 text-blue-900 font-medium transition-all duration-200 rounded-lg"
              >
                <a
                  href={club.fbLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  Follow on Facebook
                </a>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
