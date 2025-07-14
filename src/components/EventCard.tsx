import { Event } from "@/types/index";
import Link from "next/link";

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-bold text-blue-600 mb-1">{event.title}</h2>
      <p className="text-sm text-gray-600 mb-2">
        {new Date(event.date).toLocaleString()}
      </p>
      <p className="text-sm text-gray-700 mb-2">Location: {event.location}</p>
      <p className="text-sm text-gray-700 mb-2">
        Tickets Left: {event.availableTickets}
      </p>
      <Link
        href={`/events/${event._id}`}
        className="text-blue-600 hover:underline text-sm"
      >
        View Details
      </Link>
    </div>
  );
}
