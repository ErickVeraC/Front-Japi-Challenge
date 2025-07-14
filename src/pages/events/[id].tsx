import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getEventById, reserveEvent, cancelReservation } from "@/lib/api";
import { Event } from "@/types";
import { useAuth } from "@/context/AuthContext";

export default function EventDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user, token } = useAuth();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasReserved, setHasReserved] = useState(false);

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        setEvent(data);
        // Aquí podrías verificar si el usuario ya tiene reserva (opcional extra)
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleReserve = async () => {
    if (!token) return;

    try {
      await reserveEvent(id as string, token);
      setHasReserved(true);
      setEvent((prev) =>
        prev ? { ...prev, availableTickets: prev.availableTickets - 1 } : prev
      );
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleCancel = async () => {
    if (!token) return;

    try {
      await cancelReservation(id as string, token);
      setHasReserved(false);
      setEvent((prev) =>
        prev ? { ...prev, availableTickets: prev.availableTickets + 1 } : prev
      );
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (loading) return <p>Loading event...</p>;
  if (error || !event)
    return <p className="text-red-500">Error: {error || "Event not found"}</p>;

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
      <p className="text-gray-700 mb-1">
        Date: {new Date(event.date).toLocaleString()}
      </p>
      <p className="text-gray-700 mb-1">Location: {event.location}</p>
      <p className="text-gray-700 mb-4">
        Available Tickets: {event.availableTickets}
      </p>
      <p className="mb-4">{event.description}</p>

      {user && (
        <>
          {!hasReserved && event.availableTickets > 0 && (
            <button
              onClick={handleReserve}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Reserve Ticket
            </button>
          )}

          {hasReserved && (
            <button
              onClick={handleCancel}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cancel Reservation
            </button>
          )}
        </>
      )}

      {!user && (
        <p className="text-sm text-gray-600">Login to reserve a ticket.</p>
      )}
    </div>
  );
}
