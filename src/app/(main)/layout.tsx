"use client";
import Sidebar from "@/components/client/sidebar";
import React from "react";
import clsx from "clsx";
import Header from "@/components/client/header";

// This inline script runs before react hydration
// It reads the sidebar state from local storage and applies it to the body
// This prevents sidebar related flicker on initial render
function InlineScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(${(() => {
          const layout = document.querySelector("[data-layout]");
          const sidebar = document.querySelector("[data-sidebar]");

          const showSidebar = localStorage.getItem("movie-app-sidebar") === "true";

          if (layout && sidebar) {
            if (showSidebar) {
              layout.classList.add("sm:ml-64");
              sidebar.classList.add("left-0", "opacity-100");
            } else {
              layout.classList.remove("sm:ml-64");
              sidebar.classList.remove("left-0", "opacity-100");
            }
          }
          // Store sidebar state for react to read later
          window._INITIAL_SIDEBAR_STATE_ = showSidebar;
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
    // Read the sidebar state that we used in the inline script.
    // We stored the sidebar state in window._INITIAL_SIDEBAR_STATE_ because it is considered pure
    // to read it here since it will not be modified after reading it.
    // I am not sure if reading local storage instead here would also be considered pure.
    // This way now the rendered page after inline script and what react expects during hydration match.
    return window._INITIAL_SIDEBAR_STATE_;
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
