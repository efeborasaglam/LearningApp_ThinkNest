"use client";

import React from "react";
import Settings from "@/app/settings/settings";
import { useTheme } from "@/lib/ThemeContext";


const SettingsPage = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  
  return (
    <div className="min-h-screen bg-gray-50/60 dark:bg-gray-800 transition-colors duration-300">
      <Settings isDarkMode={isDarkMode} setIsDarkMode={toggleTheme} />
    </div>
  );
};

export default SettingsPage;
