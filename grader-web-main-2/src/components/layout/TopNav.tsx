import { Bell, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function TopNav() {
  const { user, profile } = useAuth();
  const displayName = profile?.displayName || user?.displayName || user?.email?.split("@")[0] || "U";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="sticky top-4 z-30 px-4 sm:px-8 pointer-events-none">
      <header className="pointer-events-auto flex h-14 items-center gap-4 bg-surface/80 backdrop-blur-2xl px-4 sm:px-6 border border-border/60 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:bg-surface/90">
        <button className="lg:hidden text-text-secondary hover:text-text-primary transition-colors">
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex-1" />

        <div className="flex items-center gap-3">
          <button className="relative p-2 text-text-secondary hover:text-text-primary rounded-full hover:bg-bg-secondary transition-all duration-300 hover:scale-105 active:scale-95">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-error ring-2 ring-surface animate-pulse"></span>
          </button>
          <Link to="/app/profile" className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-light to-primary flex items-center justify-center text-white font-medium shadow-sm cursor-pointer hover:scale-105 transition-transform">
            {initial}
          </Link>
        </div>
      </header>
    </div>
  );
}
