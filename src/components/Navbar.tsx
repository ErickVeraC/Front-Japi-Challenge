import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
      {/* Logo o nombre */}
      <Link
        href="/"
        className="text-xl font-bold text-blue-600 hover:text-blue-800"
      >
        JapiTest App
      </Link>

      <div className="flex gap-4 items-center text-sm">
        <Link href="/" className="text-gray-700 hover:text-blue-600">
          Looking for
        </Link>

        {!user && (
          <Link href="/login" className="text-gray-700 hover:text-blue-600">
            Log In
          </Link>
        )}

        {user && (
          <>
            <Link href="/create" className="text-gray-700 hover:text-blue-600">
              Create Event
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Log Out
            </button>
          </>
        )}
        {user && (
          <Link
            href="/profile"
            className="text-sm text-gray-700 hover:text-blue-600"
          >
            My Profile
          </Link>
        )}
      </div>
    </nav>
  );
}
