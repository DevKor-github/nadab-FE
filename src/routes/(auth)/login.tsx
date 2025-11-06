import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { UserSchema } from "@/features/user/userSchema";
import { useDebouncedCallback } from "use-debounce";

export const Route = createFileRoute("/(auth)/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");

  // 입력 후 일정 시간이 지나고 검증
  const validateEmail = useDebouncedCallback((value: string) => {
    const EmailSchema = UserSchema.pick({ email: true });
    const result = EmailSchema.safeParse({ email: value });
    if (!result.success) {
      setEmailError(result.error.issues[0].message);
    } else {
      setEmailError("");
    }
  }, 500);

  return (
    <div className="flex flex-col gap-5">
      <Link to="/">뒤로가기</Link>
      <h1>이메일로 로그인하기</h1>
      <label htmlFor="email">이메일</label>
      <input
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError(""); // 입력 중 에러 문구 X
          validateEmail(e.target.value);
        }}
        value={email}
        type="email"
        name="email"
        id="email"
      />
      {emailError && <p>{emailError}</p>}
      <label htmlFor="password">비밀번호</label>
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
        type="password"
        name="password"
        id="password"
      />
      {/* 이메일 오류 없고, 비밀번호 1자 이상 작성한 경우 활성화 */}
      <button
        className={`${
          !emailError && !!password ? "bg-blue-200" : "bg-slate-200"
        }`}
      >
        로그인
      </button>
    </div>
  );
}
