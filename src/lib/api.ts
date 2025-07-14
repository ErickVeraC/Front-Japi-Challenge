import { LoginResponse } from "@/types";
import { API_URL } from "./config";
import { Event } from "@/types";

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Credenciales inválidas");
  return res.json();
};

export const fetchUserProfile = async (token: string): Promise<User> => {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("No autorizado");
  return res.json();
};

export const registerUser = async (
  email: string,
  password: string
): Promise<void> => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al registrarse");
  }
};

export const getEvents = async (): Promise<Event[]> => {
  const res = await fetch(`${API_URL}/events`);
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
};

export const getEventById = async (id: string): Promise<Event> => {
  const res = await fetch(`${API_URL}/events/${id}`);
  if (!res.ok) throw new Error("Failed to fetch event");
  return res.json();
};

export const reserveEvent = async (
  eventId: string,
  token: string
): Promise<void> => {
  const res = await fetch(`${API_URL}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ eventId }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to reserve");
  }
};

export const cancelReservation = async (
  eventId: string,
  token: string
): Promise<void> => {
  const res = await fetch(`${API_URL}/reservations/${eventId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to cancel reservation");
  }
};
