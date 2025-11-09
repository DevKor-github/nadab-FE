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
    <div className="flex flex-col gap-gap-y-s">
      {label && (
        <label className="text-label-s text-field-text-mute" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        {...props}
        className={clsx(
          "w-ful rounded-lg text-caption-m text-field-text-default bg-field-bg-default border border-border-base placeholder:text-text-disabled  px-padding-x-xs py-padding-y-s focus:outline-none focus:shadow-1 focus:border-border-layer-1",
          {
            "border-border-base": variant === "basic" && !error,
          },
          error && "text-feedback-error-fg border-feedback-error-fg"
        )}
      />
      {error && <p className="text-feedback-error-fg">{error}</p>}
    </div>
  );
}
