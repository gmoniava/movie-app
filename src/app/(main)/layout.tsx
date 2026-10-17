"use client";
import Sidebar from "@/components/client/sidebar";
import React from "react";
import clsx from "clsx";
import Header from "@/components/client/header";

function initializeSidebar() {
  const showSidebar = localStorage.getItem("movie-app-sidebar") === "true";
  const layout = document.querySelector("[data-layout]");
  const sidebar = document.querySelector("[data-sidebar]");

  if (layout && sidebar) {
    // Add each class when open; remove it when closed.
    layout.classList.toggle("sm:ml-64", showSidebar);
    sidebar.classList.toggle("left-0", showSidebar);
    sidebar.classList.toggle("opacity-100", showSidebar);
  }

  // Let React initialize with the same state.
  window._INITIAL_SIDEBAR_STATE_ = showSidebar;
}


// This inline script runs before react hydration
// It reads the sidebar state from local storage and applies it to the body.
// This prevents sidebar related flicker on initial render.
function InlineScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(${initializeSidebar.toString()})()`,
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
    // We stored the sidebar state in window._INITIAL_SIDEBAR_STATE_ because it is considered pure imho
    // to read from it here because window._INITIAL_SIDEBAR_STATE_ will not be modified after we read it
    // (see here also: https://gist.github.com/sebmarkbage/75f0838967cd003cd7f9ab938eb1958f#forbidden).
    // I am not sure if reading local storage instead here would also be considered pure.
    return window._INITIAL_SIDEBAR_STATE_;
  });

  // Function to update sidebar state and persist it to local storage
  const updateSidebarState = (state: boolean) => {
    setShowSideBar(state);
    window.localStorage.setItem("movie-app-sidebar", state.toString());
  };

  return (
    <div lang="en" className="h-full flex">
      <Sidebar isOpen={showSidebar} close={() => updateSidebarState(false)} />

      <div
        data-layout
        className={clsx("flex-1 flex flex-col h-full transition-[margin-left] duration-300 ease-in-out", {
          "sm:ml-64": showSidebar,
        })}
      >
        <Header
          toggleSideBar={() => {
            updateSidebarState(!showSidebar);
          }}
        />
        <div className="flex-1 min-h-0">{children}</div>
      </div>
      <InlineScript />
    </div>
  );
}
