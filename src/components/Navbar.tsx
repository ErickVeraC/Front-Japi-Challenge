import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center h-20 px-20">
      <Link
        href="/"
        className="text-xl font-bold text-black hover:text-blue-800 mr-8"
      >
        JapiTest App.
      </Link>

      <nav className="bg-white/50 border border-white p-4 rounded-2xl backdrop-blur max-w-4xl w-full flex items-center justify-around gap-4">
        <Link
          href="/"
          className="text-gray-700 hover:text-blue-600 font-semibold"
        >
          Home
        </Link>
        <Link href="/" className="text-gray-700 hover:text-blue-600">
          Looking for
        </Link>
        {user && (
          <Link
            href="/create"
            className="text-sm text-gray-700 hover:text-green-600"
          >
            Create Event
          </Link>
        )}
        {!user && (
          <Link
            href="/login"
            className="bg-black text-white px-3 py-1 rounded-4xl hover:bg-red-600"
          >
            Log In
          </Link>
        )}
        {user && (
          <>
            <Link
              href="/profile"
              className="text-sm text-gray-700 hover:text-blue-600"
            >
              My Profile
            </Link>
            <button
              onClick={logout}
              className="bg-black text-white px-3 py-1 rounded-4xl hover:bg-red-600"
            >
              Log Out
            </button>
          </>
        )}
      </nav>
    </div>
  );
}
