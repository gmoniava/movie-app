"use client";

import Link from "next/link";
import { getButtonClassNames } from "./button";

export default function ButtonLink({ href, primary, danger, disabled, nativeProps = {}, children }: any) {
  return (
    <Link
      href={disabled ? "#" : href}
      className={getButtonClassNames({ primary, danger, disabled })}
      onClick={disabled ? (e) => e.preventDefault() : undefined}
      {...nativeProps}
    >
      {children}
    </Link>
  );
}
