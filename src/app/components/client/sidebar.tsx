"use client";
import { redirect } from "next/navigation";
import { logout } from "../../lib/auth";
import { useTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useAuth } from "@/app/AuthProvider";

export default function Page(props: any) {
  const { isAuthenticated, session } = useAuth();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  return (
    <div
      // Without setting pointer-events-none, when you hover over the hamburger icon the hand cursor will not show up always.
      className={`border-r border-r-gray-300 h-full flex flex-col gap-1 items-center transition-all ${
        props.isOpen ? "w-64 opacity-100 pointer-events-auto" : "w-0 opacity-0 pointer-events-none"
      }`}
    >
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
                redirect("/");
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
