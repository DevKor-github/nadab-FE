import BlockButton from "@/components/BlockButton";
import useSignupStore from "@/store/signupStore";
import { useState } from "react";
import { UserSchema } from "@/features/user/userSchema";
import { useDebouncedCallback } from "use-debounce";
import InputField from "@/components/InputField";
import { useNavigate } from "@tanstack/react-router";

export default function Email() {
  const updatePassword = useSignupStore.use.updatePassword();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  // 입력 후 일정 시간이 지나고 검증
  const validatePassword = useDebouncedCallback((value: string) => {
    const PasswordSchema = UserSchema.pick({ password: true });
    const result = PasswordSchema.safeParse({ password: value });
    if (!result.success) {
      setPasswordError(result.error.issues[0].message);
    } else {
      setPasswordError("");
    }
  }, 300);

  const validateConfirmPassword = useDebouncedCallback(() => {
    if (!(confirmPassword === password)) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordError("");
    }
  }, 300);

  return (
    <form
      className="flex flex-col gap-margin-y-m py-padding-y-m"
      onSubmit={(e) => {
        e.preventDefault();
        if (!passwordError && !confirmPasswordError) {
          // Todo: 다음 페이지 이동
          navigate({ to: "/" });
          // navigate({
          //   to: "/signup",
          //   search: {
          //     step: "emailVerification",
          //   },
          // });
          updatePassword(password);
        }
      }}
    >
      <InputField
        label="비밀번호"
        id="password"
        name="password"
        onChange={(e) => {
          setPassword(e.target.value);
          setPasswordError(""); // 입력 중 에러 문구 X
          validatePassword(e.target.value);
          if (confirmPassword) {
            validateConfirmPassword();
          }
        }}
        value={password}
        placeholder="비밀번호를 입력해주세요."
        type="password"
        error={passwordError}
      />
      <InputField
        label="비밀번호 재확인"
        id="confirmPassword"
        name="confirmPassword"
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          setConfirmPasswordError(""); // 입력 중 에러 문구 X
          validateConfirmPassword();
        }}
        value={confirmPassword}
        placeholder="비밀번호를 입력해주세요."
        type="password"
        error={confirmPasswordError}
      />

      <p className="text-caption-m text-neutral-800">
        영문, 숫자, 특수문자가 포함된 8자 이상의 비밀번호를 입력해주세요.
      </p>
      <BlockButton
        disabled={
          !(
            !passwordError &&
            !confirmPasswordError &&
            password &&
            confirmPassword
          )
        }
      >
        완료
      </BlockButton>
    </form>
  );
}
