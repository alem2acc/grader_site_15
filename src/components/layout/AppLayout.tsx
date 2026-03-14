import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-primary/10 selection:text-primary font-sans flex">
      <Sidebar />
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen max-w-[100vw]">
        <TopNav />
        <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full mt-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
