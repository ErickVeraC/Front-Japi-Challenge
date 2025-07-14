export interface User {
  userId: string;
  email: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  availableTickets: number;
  organizer: string;
  createdAt: string;
}

export interface Reservation {
  _id: string;
  event: Event;
  user: User;
}
