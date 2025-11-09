// input type, name 넘겨줘야 함
import type { InputHTMLAttributes, Ref } from "react";
import clsx from "clsx";

type Props = {
  variant?: "basic";
  id?: string;
  label?: string;
  error?: string;
  ref?: Ref<HTMLInputElement>;
} & InputHTMLAttributes<HTMLInputElement>;

export default function InputField({
  variant = "basic",
  id,
  label,
  error,
  ref,
  ...props
}: Props) {
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        ref={ref}
        id={id}
        {...props}
        className={clsx(
          "w-full border rounded-lg px-2 py-3",
          {
            "border-border-base": variant === "basic" && !error,
          },
          error && "text-feedback-error-fg border-feedback-error-fg"
        )}
        {...props}
      />
      {error && <p className="text-feedback-error-fg">{error}</p>}
    </div>
  );
}
