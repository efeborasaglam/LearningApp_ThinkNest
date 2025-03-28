"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    // Firebase-Logout
    await signOut(auth);

    // Cookie löschen
    document.cookie = "token=; Path=/; Max-Age=0;";

    // Zur Login-Seite
    router.push("/auth/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
}
