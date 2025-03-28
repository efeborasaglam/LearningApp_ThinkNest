"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from 'next/image';
import { useAuth } from "@/lib/AuthContext";

const NavBar = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  const navItems = [
    { href: "/dashboard", icon: "dashboard_icon.svg", label: "Dashboard", width: 12, height: 12 },
    { href: "/calendar", icon: "calendar_icon.svg", label: "Calendar", width: 15, height: 15 },
    { href: "/todo", icon: "todo_icon.svg", label: "Todo", width: 11, height: 11 },
    { href: "/notes", icon: "notes_icon.svg", label: "Notes", width: 13, height: 12 },
    { href: "/thinkAI", icon: "AI.svg", label: "ThinkAI", width: 12, height: 12 },
    { href: "/settings", icon: "settings_icon.svg", label: "Settings", width: 12, height: 12 },
  ];

  if(!user) return null;
  
  return (
    <div className="flex justify-center align-items-center mt-5 text-sm background">
      <div className="flex flex-col items-start space-y-4" >
        {navItems.map(({ href, icon, label, width, height }) => {
          const isActive = pathname === href;
          const iconPath = isActive
            ? `/assets/icons/${icon.replace(".svg", "_active.svg")}`
            : `/assets/icons/${icon}`;
          const iconClass = isActive ? "navbar-icon-active" : "navbar-icon";
          return (
            <div
              key={href}
              className={`flex items-center space-x-3 p-2 rounded w-full m-1 ${
                isActive ? "bg-black text-white" : "hover:bg-[#DAD9D9]"
              }`}
            >
              <Link href={href} className="flex justify-between align-middle">
                <Image src={iconPath} alt={label} width={width} height={height} className={`mr-3 ${iconClass}`} />
                {label}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NavBar;