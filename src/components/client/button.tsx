"use client";
import { getButtonClassNames } from "@/utils";
export default function Button({ primary, danger, nativeProps, children }: any) {
  const isDisabled = nativeProps?.disabled;

  return (
    <button className={getButtonClassNames({ primary, danger, disabled: isDisabled })} {...nativeProps}>
      {children}
    </button>
  );
}
