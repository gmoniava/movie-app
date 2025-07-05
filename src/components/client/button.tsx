"use client";

import clsx from "clsx";

export function getButtonClassNames({ primary, danger, disabled }: any = {}) {
  return clsx("px-4 py-1 rounded border", danger ? "border-red-400" : "border-gray-200", {
    "bg-[#003eab] text-white border-none": primary,
    "opacity-50 cursor-not-allowed": disabled,
    "cursor-pointer": !disabled,
  });
}

export default function Button({ primary, danger, nativeProps, children }: any) {
  return (
    <button className={getButtonClassNames({ primary, danger, disabled: nativeProps?.disabled })} {...nativeProps}>
      {children}
    </button>
  );
}
