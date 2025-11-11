// input type, name 넘겨줘야 함
import {
  useState,
  useRef,
  type InputHTMLAttributes,
  type Ref,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
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
          error && "text-feedback-error-fg! border-feedback-error-fg!"
        )}
      />
      {error && (
        <p className="text-feedback-error-fg text-caption-s">{error}</p>
      )}
    </div>
  );
}

// 회원가입 시 이메일 인증번호 입력하는 필드
// 구현의 용이성을 위해 InputField와 분리하되 유지보수성 고려해 같은 파일에서 관리
type OtpInputProps = {
  length: number;
  error?: string;
  onChange: (code: string) => void; // 상위 컴포넌트에서 문자열로 정의한 코드를 바꿔 줌
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">;

export function OtpInput({ length, error, onChange, ...props }: OtpInputProps) {
  const [code, setCode] = useState(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 숫자 하나 입력하면 다음 칸으로 넘어감
  function handleChange(e: ChangeEvent<HTMLInputElement>, idx: number) {
    const value = e.target.value.slice(-1);
    const newCode = [...code];
    newCode[idx] = value;
    setCode(newCode);
    onChange(newCode.join(""));

    if (value && idx < length - 1) inputRefs.current[idx + 1]?.focus();
  }

  // 백스페이스 누르면 지우고 이전 칸으로 감
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>, idx: number) {
    if (e.key === "Backspace" && !code[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  }

  return (
    <div className="w-full flex flex-col gap-gap-y-s">
      <div className="w-full flex gap-2.5 justify-center">
        {code.map((digit, i) => (
          <input
            autoFocus={i === 0}
            style={{ minWidth: 0 }}
            key={i}
            {...props}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            value={digit}
            type="number"
            maxLength={1}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={clsx(
              "w-10 text-center rounded-lg text-caption-m text-field-text-default bg-field-bg-default border border-border-base placeholder:text-text-disabled aspect-square focus:outline-none focus:shadow-1 focus:border-border-layer-1",
              error && "text-feedback-error-fg! border-feedback-error-fg!"
            )}
          />
        ))}
      </div>
      {error && (
        <p className="text-center text-feedback-error-fg text-caption-s">
          {error}
        </p>
      )}
    </div>
  );
}
