import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Mic, PenTool, BookOpen, Headphones, BookA, Trophy, BarChart3, Settings, Map } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { name: "Overview",   href: "/app/dashboard",  icon: Home },
  { name: "Study Plan", href: "/app/study-plan", icon: Map },
  { name: "Speaking",   href: "/app/speaking",   icon: Mic },
  { name: "Writing",    href: "/app/writing",    icon: PenTool },
  { name: "Reading",    href: "/app/reading",    icon: BookOpen },
  { name: "Listening",  href: "/app/listening",  icon: Headphones },
  { name: "Vocabulary", href: "/app/vocabulary", icon: BookA },
];

const bottomItems = [
  { name: "Leaderboard", href: "/app/leaderboard", icon: Trophy },
  { name: "Analytics", href: "/app/analytics", icon: BarChart3 },
  { name: "Settings", href: "/app/settings", icon: Settings },
];

const NavLink = ({ item }: { item: any; key?: string | number }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(item.href);
  return (
    <Link
      to={item.href}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
        isActive 
          ? "bg-surface text-primary shadow-[0_2px_8px_rgb(0,0,0,0.04)] border border-border/60" 
          : "text-text-secondary hover:text-text-primary hover:bg-black/5"
      )}
    >
      <item.icon className={cn("w-4 h-4 transition-colors", isActive ? "text-primary" : "text-text-tertiary group-hover:text-text-secondary")} />
      {item.name}
    </Link>
  );
};

export function Sidebar() {
  const { user, profile } = useAuth();
  const displayName = profile?.displayName || user?.displayName || user?.email?.split("@")[0] || "User";
  const shortName = displayName.split(" ").slice(0, 2).map((n: string) => n.charAt(0).toUpperCase() + n.slice(1)).join(" ");
  const initial = displayName.charAt(0).toUpperCase();
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-bg-secondary flex flex-col hidden lg:flex border-r border-border/40 z-40">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-sm">G</span>
        </div>
        <span className="font-semibold text-lg tracking-tight text-text-primary">Grader AI</span>
      </div>

      <div className="flex-1 px-4 py-2 space-y-8 overflow-y-auto scrollbar-hide">
        <div className="space-y-1">
          <div className="px-3 py-2 text-[10px] font-bold text-text-tertiary uppercase tracking-widest">Platform</div>
          {navItems.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
        </div>

        <div className="space-y-1">
          <div className="px-3 py-2 text-[10px] font-bold text-text-tertiary uppercase tracking-widest">Account</div>
          {bottomItems.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
        </div>
      </div>

      <div className="p-4">
        <Link to="/app/profile" className="flex items-center gap-3 p-3 rounded-xl hover:bg-black/5 transition-colors border border-transparent hover:border-border/50">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary-light to-primary flex items-center justify-center text-white font-medium shadow-sm">
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">{shortName}</p>
            <p className="text-xs text-text-tertiary truncate">{user?.email}</p>
          </div>
        </Link>
      </div>
    </aside>
  );
}
