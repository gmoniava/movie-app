import clsx from "clsx";

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
    "btn-primary-bg-disabled opacity-50 cursor-not-allowed": disabled,
    "cursor-pointer": !disabled,
  });
}
