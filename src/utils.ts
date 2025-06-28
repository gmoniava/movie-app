import clsx from "clsx";

export const PAGE_SIZE = 10;

// Extract because we use this for links too to style them like buttons
export function getButtonClassNames({
  primary,
  danger,
  disabled,
}: {
  primary?: boolean;
  danger?: boolean;
  disabled?: boolean;
} = {}) {
  return clsx("px-4 py-1 rounded border btn-default-text", danger ? "border-red-400" : "border-gray-200", {
    "btn-primary-bg btn-primary-text border-none": primary,
    "opacity-50 cursor-not-allowed": disabled,
    "cursor-pointer": !disabled,
  });
}
