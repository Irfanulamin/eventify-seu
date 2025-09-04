"use client";
import React, { useEffect, useState } from "react";
import CreateClubForm from "./_components/CreateClub";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import EditClubForm from "./_components/EditClub";
import DeleteClubDialog from "./_components/DeleteClub";

interface Club {
  _id: string;
  name: string;
  description: string;
  fbLink: string;
  imageUrl?: string;
}

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
      <div className="my-4 flex justify-end">
        <div>
          <h2 className="text-right text-lg font-semibold text-gray-800">
            Create a new club
          </h2>
          <p className="text-right text-sm text-gray-600 mb-2">
            Click the button below to add your club to the list.
          </p>
          <div className="my-4 flex justify-end">
            <CreateClubForm onSuccess={fetchClubs} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 justify-items-center">
        {clubs.map((club) => (
          <Card
            key={club._id}
            className="relative w-full max-w-sm bg-white/10 border border-white/20 shadow transition-all duration-300 rounded-xl p-0 flex flex-col"
          >
            <div className="relative w-full aspect-square overflow-hidden rounded-t-xl">
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

            <div className="px-6 bg-gradient-to-b from-white/5 to-white/10 flex flex-col justify-between flex-1">
              <div className="flex flex-col gap-2 text-left">
                <h3 className="text-xl font-semibold text-blue-900 leading-tight">
                  {club.name}
                </h3>
                <p className="text-sm text-blue-900/80 leading-relaxed line-clamp-2">
                  {club.description}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4">
              <EditClubForm clubData={club} onSuccess={fetchClubs} />
              <DeleteClubDialog clubData={club} onSuccess={fetchClubs} />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
