"use client";
import { redirect } from "next/navigation";
import { logout } from "@/server-functions/auth";
import { useTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useAuth } from "@/components/client/auth-provider";

export default function Page(props: any) {
  const { isAuthenticated, checkAuth } = useAuth();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
    },
    {
      href: "/add-movie",
      label: "Add movie",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      href: "/search",
      label: "Search movies",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      className={clsx(
        "w-64 fixed default-bg border-r border-r-gray-300 h-full flex flex-col gap-5 items-center transition-opacity duration-500 delay-100 z-999000 -left-64 opacity-0",
        {
          "left-0 opacity-100 p-5": props.isOpen,
        }
      )}
    >
      {/* Backdrop for mobile */}
      {/* Visible only on mobile when sidebar is open */}
      {props.isOpen && (
        <div className="pointer-events-auto fixed left-64 top-0 right-0 bottom-0 bg-black opacity-25 flex items-center justify-center z-9050 md:hidden" />
      )}

      {/* Close button */}
      {/* Visible only on mobile when sidebar is open */}
      <div className="md:hidden w-64 flex justify-end pr-5">
        <button
          className="p-2 rounded-full hover:bg-gray-200 cursor-pointer"
          onClick={() => {
            props.close();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* The nav items */}
      <div className="w-full mt-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx("flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200", {
              "bg-blue-100 text-blue-600 font-medium": pathname === item.href,
              "hover:bg-gray-200/50": pathname !== item.href,
            })}
          >
            <span
              className={clsx({
                "text-blue-500": pathname === item.href,
                "text-gray-500": pathname !== item.href,
              })}
            >
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}

        {/* Login/Logout buttons */}
        {isAuthenticated ? (
          <button
            type="submit"
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-gray-200/50 transition-all duration-200 cursor-pointer"
            onClick={() => {
              startTransition(async () => {
                await logout();
                checkAuth();
              });
            }}
            disabled={isPending}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>
            {isPending ? "Logging out..." : "Logout"}
          </button>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-gray-200/50 transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
