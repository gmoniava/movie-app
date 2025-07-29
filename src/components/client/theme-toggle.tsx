"use client";
import Switch from "react-switch";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { useIsClient } from "@uidotdev/usehooks";

const Toggle = (props: any) => {
  const { theme, setTheme } = useTheme();
  const isClient = useIsClient();

  // To avoid hydration issues, we check if we are on the client side
  if (!isClient) return null;

  return (
    <div className="flex items-center gap-5">
      {" "}
      <div className="">
        {/* Using currentColor for theme consistency */}
        <svg width="24" height="24" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <circle fill="none" cx="32" cy="32" r="12" stroke="currentColor" strokeWidth="4" />
          <line x1="32" y1="4" x2="32" y2="14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <line x1="32" y1="50" x2="32" y2="60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <line x1="4" y1="32" x2="14" y2="32" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <line x1="50" y1="32" x2="60" y2="32" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <line x1="12" y1="12" x2="20" y2="20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <line x1="44" y1="44" x2="52" y2="52" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <line x1="12" y1="52" x2="20" y2="44" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <line x1="44" y1="20" x2="52" y2="12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>
      <Switch
        height={15}
        uncheckedIcon={false}
        checkedIcon={false}
        onChange={(value) => {
          setTheme(value ? "dark" : "light");
        }}
        checked={theme === "dark" ? true : false}
      />
      <div className="">
        {/* Using currentColor for theme consistency */}
        <svg width="24" height="24" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path
            transform="translate(2,0) rotate(20 32 32)"
            d="M41 32a19 19 0 1 1-24-15 13 13 0 1 0 24 15z"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default Toggle;
