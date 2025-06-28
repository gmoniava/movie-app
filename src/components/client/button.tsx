"use client";

import clsx from "clsx";

export function getButtonClassNames({ primary, danger, disabled }: any = {}) {
  return clsx("px-4 py-1 rounded border btn-default-text", danger ? "border-red-400" : "border-gray-200", {
    "btn-primary-bg btn-primary-text border-none": primary,
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
