"use client";
import { redirect } from "next/navigation";
import { logout } from "@/actions/auth";
import { useTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useAuth } from "@/components/client/auth-provider";

export default function Page(props: any) {
  const { isAuthenticated, session, checkAuth } = useAuth();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  return (
    <div
      className={clsx(
        "w-64 bg-bg-default fixed border-r border-r-gray-300 h-full flex flex-col gap-5 items-center transition-opacity duration-500 delay-100 z-1 -left-64 opacity-0",
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

      <div>
        {" "}
        <Link
          href="/"
          className={clsx("cursor-pointer", {
            "bg-sky-100 text-blue-600": pathname === "/",
          })}
        >
          Home
        </Link>
      </div>

      <div>
        {" "}
        <Link
          href="/add-movie"
          className={clsx("cursor-pointer", {
            "bg-sky-100 text-blue-600": pathname === "/add-movie",
          })}
        >
          Add movie
        </Link>
      </div>

      <div>
        <Link
          href="/search"
          className={clsx("cursor-pointer", {
            "bg-sky-100 text-blue-600": pathname === "/search",
          })}
        >
          Search movies
        </Link>
      </div>

      {isAuthenticated ? (
        <div>
          <button
            type="submit"
            className="cursor-pointer"
            onClick={() => {
              startTransition(async () => {
                await logout();
                checkAuth();
              });
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          {" "}
          <Link href="/login" className={clsx("cursor-pointer")}>
            Login
          </Link>
        </div>
      )}
    </div>
  );
}
