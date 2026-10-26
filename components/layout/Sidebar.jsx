"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Upload,
  UserRound,
  Settings,
  LogOut,
} from "lucide-react";

const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Documents",
    href: "/documents",
    icon: FileText,
  },
  {
    label: "Upload document",
    href: "/documents/new",
    icon: Upload,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: UserRound,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar({ user }) {
  const pathname = usePathname();

  const name = user?.name || "User";
  const email = user?.email || "";
  const avatar = user?.avatar || "";
  const initial = name.charAt(0).toUpperCase();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-blue-100 bg-white">
      {/* Brand */}
      <div className="border-b border-slate-100 px-6 py-5">
        <Link href="/dashboard" className="inline-flex">
          <span className="text-2xl font-black tracking-tight text-[#0B1F3A]">
            doc
            <span className="text-[#155EEF]">nest</span>
            <span className="text-[#155EEF]">.</span>
          </span>
        </Link>

        <p className="mt-1 text-xs font-medium text-slate-400">
          Your documents. One secure place.
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-5">
        {links.map((link) => {
          const Icon = link.icon;

          const isActive =
            pathname === link.href ||
            (link.href !== "/dashboard" &&
              pathname.startsWith(`${link.href}/`));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-blue-50 text-[#155EEF]"
                  : "text-slate-500 hover:bg-slate-50 hover:text-[#0B1F3A]"
              }`}
            >
              <Icon
                className={`h-5 w-5 ${
                  isActive
                    ? "text-[#155EEF]"
                    : "text-slate-400 group-hover:text-[#0B1F3A]"
                }`}
              />

              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-slate-100 p-4">
        <div className="flex items-center gap-3 rounded-xl p-2">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-50"
            />
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#155EEF] text-sm font-black text-white ring-2 ring-blue-50">
              {initial}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-[#0B1F3A]">
              {name}
            </p>

            <p className="truncate text-xs text-slate-400">
              {email}
            </p>
          </div>
        </div>

        <Link
          href="/api/auth/logout"
          className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </Link>
      </div>
    </aside>
  );
}