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
        "w-full flex justify-center items-center",
        {
          "bg-blue-200 hover:bg-blue-300": variant === "primary",
        },
        disabled && "bg-blue-100"
      )}
      {...props}
    >
      {children}
    </button>
  );
}
