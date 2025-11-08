import BlockButton from "@/components/BlockButton";
import { Link } from "@tanstack/react-router";
import useSignupStore from "@/store/signupStore";
import { useState } from "react";
import { UserSchema } from "@/features/user/userSchema";
import { useDebouncedCallback } from "use-debounce";
import InputField from "@/components/InputField";

export default function Email() {
  const updateEmail = useSignupStore.use.updateEmail();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // 입력 후 일정 시간이 지나고 검증
  const validateEmail = useDebouncedCallback((value: string) => {
    const EmailSchema = UserSchema.pick({ email: true });
    const result = EmailSchema.safeParse({ email: value });
    if (!result.success) {
      setEmailError(result.error.issues[0].message);
    } else {
      setEmailError("");
    }
  }, 300);
  return (
    <div>
      <h1>이메일 인증을 해주세요.</h1>
      <form action="">
        <InputField
          label="이메일 주소"
          id="email"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(""); // 입력 중 에러 문구 X
            validateEmail(e.target.value);
          }}
          value={email}
          type="email"
          error={emailError}
        />
      </form>
      {!emailError ? (
        <Link
          to="/signup"
          search={{ step: "email" }}
          onClick={() => updateEmail("")}
        >
          <BlockButton>완료</BlockButton>
        </Link>
      ) : (
        <BlockButton disabled>완료</BlockButton>
      )}
    </div>
  );
}
