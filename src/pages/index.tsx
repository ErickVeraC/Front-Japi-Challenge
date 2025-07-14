import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import { getEvents } from "@/lib/api";
import { Event } from "@/types";
import EventCard from "@/components/EventCard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <main>
      <section>
        <h1
          className={`${geistSans.variable} text-5xl md:text-6xl font-black text-black mb-4 text-center py-4 leading-snug`}
        >
          <span className="tracking-widest inline-block">JapiTest App</span>
          <br />
          <span className="text-3xl md:text-4xl tracking-normal">
            Create and publish your events
          </span>
        </h1>
      </section>
      <section>
        <div className="flex justify-center">
          <div
            className={`${geistMono.variable} border border-white bg-gradient-to-br from-white to-yellow-500 text-black text-center rounded-2xl px-6 py-2 inline-block font-thin`}
          >
            <h3>Check all the events in realtime and reserve tickets for it</h3>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 py-10 gap-6">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </section>
    </main>
  );
}
