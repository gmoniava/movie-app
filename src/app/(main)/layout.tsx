"use client";
import Sidebar from "@/components/client/sidebar";
import React from "react";
import clsx from "clsx";
import Header from "@/components/client/header";

// This inline script runs before react hydration
// It reads the theme from local storage and applies it to the body
// This prevents a hydration flicker
function InlineScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(${(() => {
          const layout = document.querySelector("[data-layout]");
          const sidebar = document.querySelector("[data-sidebar]");

          const theme = localStorage.getItem("movie-app-sidebar") === "true";

          if (layout && sidebar) {
            if (theme) {
              layout.classList.add("sm:ml-64");
              sidebar.classList.add("left-0", "opacity-100");
            } else {
              layout.classList.remove("sm:ml-64");
              sidebar.classList.remove("left-0", "opacity-100");
            }
          }
          // Store theme for react to read later
          (window as any).__INITIAL_THEME__ = theme;
        }).toString()})()`,
      }}
    />
  );
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showSidebar, setShowSideBar] = React.useState(() => {
    // During server side rendering there is no window
    if (typeof window === "undefined") {
      return false;
    }
    // Read the initial value that we stored in the inline script to get the correct theme.
    // We stored the theme in window because it is considered pure in react to read that value here
    // (because that value won't change after reading).
    // I am not sure if reading local storage instead here is also considered pure.
    // This way now the rendered page after inline script and the react hydration should match.
    return (window as any).__INITIAL_THEME__;
  });

  return (
    <div lang="en" className="h-full flex">
      <Sidebar
        isOpen={showSidebar}
        close={() => {
          setShowSideBar(false);
          window.localStorage.setItem("movie-app-sidebar", "false");
        }}
      />

      <div
        data-layout
        className={clsx("flex-1 flex flex-col h-full transition-[margin-left] duration-300 ease-in-out", {
          "sm:ml-64": showSidebar,
        })}
      >
        <Header
          toggleSideBar={() => {
            setShowSideBar(!showSidebar);
            window.localStorage.setItem("movie-app-sidebar", (!showSidebar).toString());
          }}
        />
        <div className="flex-1 min-h-0">{children}</div>
      </div>
      <InlineScript />
    </div>
  );
}
