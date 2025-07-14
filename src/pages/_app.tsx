import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";
import type { AppProps } from "next/app";

import MainLayout from "@/components/MainLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-yellow-200">
      <AuthProvider>
        <MainLayout>
          <Component {...pageProps} />;
        </MainLayout>
      </AuthProvider>
    </div>
  );
}
