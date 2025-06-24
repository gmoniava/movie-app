"use client";
import clsx from "clsx";
export default function Button({ primary, danger, nativeProps, children }: any) {
  const isDisabled = nativeProps?.disabled;

  return (
    <button
      className={clsx("px-4 py-1 rounded border", danger ? "border-red-400" : "border-gray-200", {
        "btn-primary-bg text-white border-none": primary,
        "btn-primary-bg-disabled opacity-50 cursor-not-allowed": isDisabled,
        "cursor-pointer": !isDisabled,
      })}
      {...nativeProps}
    >
      {children}
    </button>
  );
}
