"use client";

import "../globals.css";
import Header from "@/app/header/Header";
import Navbar from "@/app/navbar/NavBar";
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
            <div className="fixed w-full top-0 z-10">
              <Header />
            </div>

            <div className="flex h-screen pt-[5rem]">
              <div className="fixed h-full w-[12.5rem]">
                <Navbar />
              </div>
              <main className="flex-1 ml-56 bg-gray-50/60 dark:bg-gray-800 rounded-tl-[1rem] overflow-y-scroll px-14 py-12 transition-colors duration-300">
                {children}
              </main>
            </div>
            <SpeedInsights />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  
    
  );
}
