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
  const [shouldAnimate, setShouldAnimate] = React.useState(false);

  return (
    <div lang="en" className="h-full flex">
      <Sidebar
        isOpen={showSidebar}
        shouldAnimate={shouldAnimate}
        close={() => {
          setShowSideBar(false);
        }}
      />

      <div
        className={clsx("flex-1 flex flex-col h-full", {
          "sm:ml-64": showSidebar,
          "transition-[margin-left] duration-300 ease-in-out": shouldAnimate,
        })}
      >
        <Header
          toggleSideBar={() => {
            setShowSideBar(!showSidebar);
            setShouldAnimate(true);
          }}
        />
        <div className="flex-1 min-h-0">{children}</div>
      </div>
    </div>
  );
}
