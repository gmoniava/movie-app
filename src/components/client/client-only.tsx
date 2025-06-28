"use client";
/**
 * Hack to work around next.js hydration
 * This pattern is used to work around Next.js hydration mismatches when rendering
 * client-only components that use browser-specific features (like hooks that depend on the window object or localStorage).
 * @see https://github.com/uidotdev/usehooks/issues/218
 */
import React from "react";
import { useIsClient } from "@uidotdev/usehooks";

type ClientOnlyProps = {
  children: React.ReactNode;
};

export const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const isClient = useIsClient();

  // Render children if on client side, otherwise return null
  return isClient ? <>{children}</> : null;
};
