"use client";
import clsx from "clsx";
export default function Button({ onClick, primary, nativeProps, children }: any) {
  return (
    <button
      className={clsx("px-4 py-1 rounded border  cursor-pointer", {
        "bg-blue-500 text-white border-none": primary,
      })}
      {...nativeProps}
    >
      {children}
    </button>
  );
}
