"use client";

import "../globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/lib/ThemeContext";
import { AuthProvider } from "@/lib/AuthContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap"
        />
        <Analytics />
      </head>
      <body className="h-full">
        <AuthProvider>
          <ThemeProvider>
            {/* Ganze Höhe (h-screen), Hintergrund und zentrierter Inhalt */}
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
              <div className="w-full bg-white shadow-md rounded-lg">
                {children}
              </div>
            </div>
            <SpeedInsights />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
