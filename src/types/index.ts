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
  date: string;
  location: string;
  description: string;
  capacity: number;
  availableTickets: number;
  organizer: string;
}

export interface Reservation {
  _id: string;
  event: Event;
  user: User;
}
