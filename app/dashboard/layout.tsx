"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Home,
  CheckSquare,
  Calendar,
  Settings,
  Users,
  Bell,
  BarChart,
  LogOut,
  HelpCircle,
  Bot,
  Menu,
  ArrowLeft,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar with Mobile Toggle */}
      <div className="relative z-40">
        {/* Mobile Menu Button - Always Visible */}
          <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed top-4 left-4 p-2 bg-zinc-800 rounded-lg"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>

        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed h-full border-r border-zinc-800 p-4 bg-black transition-all duration-300 ease-in-out ${
            isCollapsed ? "lg:w-20" : "w-64"
          }`}
        >
          {/* Back to Home Link */}
          <Link
            href="/"
            className={`mb-6 flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors ${
              isCollapsed ? "lg:justify-center" : ""
            }`}
          >
            <ArrowLeft
              className={`${isCollapsed ? "lg:w-8 lg:h-8" : "w-4 h-4"}`}
            />
            <span className={isCollapsed ? "lg:hidden" : ""}>Back to Home</span>
          </Link>

          {/* Logo */}
          <div className="mb-8 px-2 flex items-center justify-between">
            <Image
              src="/assets/logo.png"
              alt="Chimly"
              width={120}
              height={40}
              className={`brightness-0 invert transition-all duration-300 ${
                isCollapsed ? "hidden" : "block"
              }`}
            />
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:block p-2 hover:bg-zinc-800 rounded-lg"
            >
              <Menu
                className={`${
                  isCollapsed ? "lg:w-6 lg:h-6" : "w-4 h-4"
                } text-white`}
              />
          </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors ${
                isCollapsed ? "lg:justify-center" : ""
              }`}
            >
              <Home
                className={`${isCollapsed ? "lg:w-8 lg:h-8" : "w-4 h-4"}`}
              />
              <span className={isCollapsed ? "lg:hidden" : ""}>Home</span>
            </Link>

            <Link
              href="/dashboard/ai"
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors ${
                isCollapsed ? "lg:justify-center" : ""
              }`}
            >
              <Bot className={`${isCollapsed ? "lg:w-8 lg:h-8" : "w-4 h-4"}`} />
              <span className={isCollapsed ? "lg:hidden" : ""}>AI</span>
            </Link>

            <Link
              href="/dashboard/tasks"
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors ${
                isCollapsed ? "lg:justify-center" : ""
              }`}
            >
              <CheckSquare
                className={`${isCollapsed ? "lg:w-8 lg:h-8" : "w-4 h-4"}`}
              />
              <span className={isCollapsed ? "lg:hidden" : ""}>Tasks</span>
            </Link>

            {/* Disabled links with Coming Soon badges */}
            {[
              {
                href: "/dashboard/calendar",
                icon: Calendar,
                label: "Calendar",
              },
              {
                href: "/dashboard/analytics",
                icon: BarChart,
                label: "Analytics",
              },
              { href: "/dashboard/team", icon: Users, label: "Team" },
            ].map((item) => (
              <div
                key={item.href}
                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-500 rounded-lg ${
                  isCollapsed ? "lg:justify-center" : ""
                }`}
              >
                <item.icon
                  className={`${isCollapsed ? "lg:w-8 lg:h-8" : "w-4 h-4"}`}
                />
                {!isCollapsed && (
                  <div className="flex items-center justify-between w-full">
                    <span>{item.label}</span>
                    <div className="text-xs px-2 py-0.5 rounded-full bg-zinc-800/50">
                      Coming Soon
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Settings Section */}
          <div className="mt-8">
            <h3
              className={`px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 ${
                isCollapsed ? "lg:hidden" : ""
              }`}
            >
              Settings
            </h3>
            <nav className="space-y-1">
              {[
                {
                  href: "/dashboard/settings",
                  icon: Settings,
                  label: "Settings",
                },
                {
                  href: "/dashboard/notifications",
                  icon: Bell,
                  label: "Notifications",
                },
              ].map((item) => (
                <div
                  key={item.href}
                  className={`flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-500 rounded-lg ${
                    isCollapsed ? "lg:justify-center" : ""
                  }`}
                >
                  <item.icon
                    className={`${isCollapsed ? "lg:w-8 lg:h-8" : "w-4 h-4"}`}
                  />
                  {!isCollapsed && (
                    <div className="flex items-center justify-between w-full">
                      <span>{item.label}</span>
                      <div className="text-xs px-2 py-0.5 rounded-full bg-zinc-800/50">
                        Coming Soon
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* User Section - moved to bottom */}
          <div
            className={`fixed bottom-0 left-0 ${
              isCollapsed ? "lg:w-20" : "w-64"
            } pt-4 border-t border-zinc-800 bg-black`}
          >
            <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <span className="text-sm font-medium text-emerald-500">JD</span>
              </div>
              <div className={`flex-1 min-w-0 ${isCollapsed ? "lg:hidden" : ""}`}>
                <p className="text-sm font-medium text-white truncate">
                  John Doe
                </p>
                <p className="text-xs text-zinc-500 truncate">
                  john@example.com
                </p>
              </div>
              <LogOut className={`w-4 h-4 text-zinc-400 ${isCollapsed ? "lg:hidden" : ""}`} />
            </div>
          </div>
        </aside>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full lg:ml-64 transition-all duration-300">
        <div className="p-4 sm:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}
