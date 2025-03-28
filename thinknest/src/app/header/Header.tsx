import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { useTheme } from "@/lib/ThemeContext";
import { useAuth } from "@/lib/AuthContext";

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("John Doe");
  const [mounted, setMounted] = useState(false); // Prüft, ob das Component gemountet wurde
  const pathname = usePathname();
  const { user } = useAuth();

  const lightmode = {
    light: "/assets/icons/sun.svg",
    dark: "/assets/icons/moon.svg",
  };

  useEffect(() => {
    setProfileImage(localStorage.getItem("profileImage") || null);
    setUserName(localStorage.getItem("userName") || "John Doe");
    setMounted(true); // Erst nach Mounting Icons anzeigen
  }, []);

  if(!user) return null;

  return (
    <div className="flex items-center justify-between p-4 pt-6">
      <div className="font-bold ml-5 text-2xl">
        <div className="cursor-pointer" onClick={() => window.location.reload()}>
          Think<span className="text-[#28AD5E]">Nest</span>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        {/* Darkmode-Button nur anzeigen, wenn nicht auf /settings */}
        {pathname !== "/settings" && mounted && (
        <button
          onClick={toggleTheme}
          className="px-4 py-2 dark:bg-green-700 rounded hover:bg-green-950 dark:hover:bg-green-800 transition-colors duration-300"
        >
          <Image
            src={isDarkMode ? lightmode.light : lightmode.dark}
            alt="Theme Icon"
            width={24}
            height={24}
          />
        </button>
        )}
        <p className="font-medium text-md">{userName}</p>
        {profileImage ? (
          <img src={profileImage} alt="Profile" className="w-12 h-12 rounded-full object-cover" />
        ) : (
          <div className="w-7 h-7 rounded-full bg-[#28AD5E]" />
        )}
      </div>
    </div>
  );
};

export default Header;
