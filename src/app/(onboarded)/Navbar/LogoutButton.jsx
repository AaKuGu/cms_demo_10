"use client";

import { useAuth } from "@/hooks/useAuth";

export default function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="text-sm font-medium text-slate-600 hover:text-slate-900"
    >
      Log out
    </button>
  );
}