"use client";
import Sidebar from "@/app/components/client/sidebar";
import React from "react";
import Toggle from "../components/client/ThemeToggle";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showSidebar, setShowSidebar] = React.useState(false);
  return (
    <div lang="en" className="h-full flex ">
      <Sidebar isOpen={showSidebar} />
      <div className="flex-1 flex flex-col h-full">
        <div className="border-b border-b-gray-300 p-[5px] flex items-center">
          <div
            className="cursor-pointer"
            onClick={() => {
              setShowSidebar(!showSidebar);
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="6" width="18" height="2" fill="currentColor" />
              <rect x="3" y="11" width="18" height="2" fill="currentColor" />
              <rect x="3" y="16" width="18" height="2" fill="currentColor" />
            </svg>
          </div>
          <div className="flex-1 flex items-center justify-end">
            <Toggle />
          </div>
        </div>
        <div className="p-[5px] flex-1 min-h-0">{children}</div>
      </div>
    </div>
  );
}
