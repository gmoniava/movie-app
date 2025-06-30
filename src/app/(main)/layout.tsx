"use client";
import Sidebar from "@/components/client/sidebar";
import React from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import clsx from "clsx";
import Header from "@/components/server/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showSidebar, setShowSideBar] = useLocalStorage("movie-app", false);

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
