import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Props = {
  variant?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function BlockButton({
  variant = "primary",
  disabled = false,
  children,
  ...props
}: Props) {
  return (
    <button
      disabled={disabled}
      className={clsx(
        "w-full text-center rounded-lg py-padding-y-m",
        {
          "bg-button-primary-bg-default hover:bg-button-primary-bg-hover text-button-primary-text-default":
            variant === "primary" && !disabled,
        },
        disabled &&
          "bg-button-disabled-bg-default text-button-disabled-text-default"
      )}
      {...props}
    >
      {children}
    </button>
  );
}
