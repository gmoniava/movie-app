"use client";
import clsx from "clsx";
export default function Button({ primary, nativeProps, children }: any) {
  const isDisabled = nativeProps?.disabled;

  return (
    <button
      className={clsx("px-4 py-1 rounded borde", {
        "bg-btn-primary-bg text-white border-none": primary,
        "bg-btn-primary-bg-disabled opacity-50 cursor-not-allowed": isDisabled,
        "cursor-pointer": !isDisabled,
      })}
      {...nativeProps}
    >
      {children}
    </button>
  );
}
