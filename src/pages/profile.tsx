import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getMyReservations } from "@/lib/api";
import { Event } from "@/types";
import Link from "next/link";

export default function ProfilePage() {
  const { user, token } = useAuth();
  const [reservations, setReservations] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    getMyReservations(token)
      .then(setReservations)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  if (!user)
    return (
      <p className="text-center mt-10">
        You must be logged in to view your profile.
      </p>
    );
  if (loading)
    return <p className="text-center mt-10">Loading your reservations...</p>;
  if (error)
    return <p className="text-red-500 text-center mt-10">Error: {error}</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4 text-center">My Reservations</h1>

      {reservations.length === 0 ? (
        <p className="text-center text-gray-600">
          You have no reservations yet.
        </p>
      ) : (
        <ul className="space-y-4">
          {reservations.map((event) => (
            <li key={event._id} className="border p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-blue-600">
                {event.title}
              </h2>
              <p className="text-sm text-gray-600">
                Date: {new Date(event.date).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                Location: {event.location}
              </p>
              <Link
                href={`/events/${event._id}`}
                className="text-blue-500 text-sm hover:underline"
              >
                View Details
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
