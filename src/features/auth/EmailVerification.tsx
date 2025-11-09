import BlockButton from "@/components/BlockButton";
import { Link } from "@tanstack/react-router";
import useSignupStore from "@/store/signupStore";
import { useState, useRef } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import InputField from "@/components/InputField";

export default function EmailVerification() {
  const updateIsEmailVerified = useSignupStore.use.updateIsEmailVerified();
  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  function handleChange(e: ChangeEvent<HTMLInputElement>, idx: number) {
    setCode((prev) =>
      prev.map((v, i) => {
        if (i === idx) {
          return e.target.value;
        } else {
          return v;
        }
      })
    );
    if (e.target.value !== "") {
      inputRefs.current[idx + 1]?.focus();
    }
  }

  function handleBack(e: KeyboardEvent<HTMLInputElement>, idx: number) {
    if (e.key !== "Backspace") return;

    // 1) 현재 칸에 값이 있으면, 지우고 커서 이동 막기
    if (code[idx] !== "") {
      e.preventDefault(); // 브라우저 기본 Backspace 동작 막고
      const newCode = [...code];
      newCode[idx] = "";
      setCode(newCode);
      return;
    }

    // 2) 이미 빈 칸이면 이전 인풋으로 포커스
    inputRefs.current[idx - 1]?.focus();
  }

  return (
    <div>
      <h1>메일로 전송된 인증번호 6자리를 입력해 주세요.</h1>
      <form action="">
        {code.map((digit, idx) => (
          <InputField
            key={idx}
            ref={(el) => {
              inputRefs.current[idx] = el;
            }}
            onChange={(e) => handleChange(e, idx)}
            onKeyDown={(e) => handleBack(e, idx)}
            value={digit}
            type="number"
            error={error}
          />
        ))}
      </form>
      {!error ? (
        <Link
          to="/signup"
          search={{ step: "password" }}
          onClick={updateIsEmailVerified}
        >
          <BlockButton>완료</BlockButton>
        </Link>
      ) : (
        <BlockButton disabled>완료</BlockButton>
      )}
    </div>
  );
}
