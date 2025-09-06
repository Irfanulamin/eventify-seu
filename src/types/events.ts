interface Button {
  label: string;
  url: string;
  _id: string;
}

interface Club {
  _id: string;
  name: string;
  description: string;
  fbLink: string;
  imageUrl?: string; // optional
  imagePublicId?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface Event {
  _id: string;
  name: string;
  imageUrl: string;
  imagePublicId: string;
  description: string;
  date: string;
  buttons?: Button[];
  club: Club;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ClubsResponse {
  success: boolean;
  data: {
    clubs: Club[];
  };
}

interface EventsResponse {
  success: boolean;
  data: {
    events: Event[];
  };
}

export type { Event, EventsResponse };
