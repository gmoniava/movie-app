"use client";
import Sidebar from "@/components/client/sidebar";
import React from "react";
import clsx from "clsx";
import Header from "@/components/client/header";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useIsClient } from "@uidotdev/usehooks";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showSidebar, setShowSideBar] = useLocalStorage("movie-app", false);
  const isClient = useIsClient();

  // To avoid hydration issues (since we are using localStorage), we check if we are on the client side
  if (!isClient) return null;

  return (
    <div lang="en" className="h-full flex">
      <Sidebar
        isOpen={showSidebar}
        close={() => {
          setShowSideBar(false);
        }}
      />

      <div
        className={clsx("flex-1 flex flex-col h-full transition-[margin-left] duration-300 ease-in-out", {
          "sm:ml-64": showSidebar,
        })}
      >
        <Header toggleSideBar={() => setShowSideBar(!showSidebar)} />
        <div className="flex-1 min-h-0">{children}</div>
      </div>
    </div>
  );
}
