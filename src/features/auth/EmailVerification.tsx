import BlockButton from "@/components/BlockButton";
import useSignupStore from "@/store/signupStore";
import { useEffect, useRef, useState } from "react";
import { OtpInput } from "@/components/InputField";
import { useNavigate } from "@tanstack/react-router";

export default function EmailVerification() {
  const updateIsEmailVerified = useSignupStore.use.updateIsEmailVerified();
  const email = useSignupStore.use.email();
  const [enteredCode, setEnteredCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [timeLeft, setTimeLeft] = useState(180); // 3분

  // 진입 시 이메일 전송
  useEffect(() => {
    // Todo: 이메일 인증번호 발송 api 연동
    alert(email + "로 인증번호 발송: 123456");
  }, [email]);

  function startTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // 1초마다
  }

  // 진입 시 타이머 설졍
  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  });

  function handleResend() {
    setTimeLeft(180);
    startTimer();
    // Todo: 이메일 인증번호 발송 api 연동
    alert(email + "로 인증번호 재전송: 123456");
  }

  return (
    <div>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          // Todo: 이메일 인증번호 확인 api 연동
          if (enteredCode === "123456") {
            alert(enteredCode + "를 백엔드에 전송했습니다. 에러 없음.");
            updateIsEmailVerified();
            navigate({
              to: "/signup",
              search: {
                step: "password",
              },
            });
          } else {
            setError("입력한 정보를 한번 더 확인해주세요.");
          }
        }}
      >
        {/* Todo: 상단 마진 수정 */}
        <div className="mb-margin-y-l flex flex-col gap-gap-y-m">
          <OtpInput
            length={6}
            error={error}
            onChange={(code: string) => {
              setError("");
              setEnteredCode(code);
            }}
          />
          <p className="text-center text-label-m text-text-tertiary">
            <span>
              {Math.floor(timeLeft / 60)
                .toString()
                .padStart(2, "0")}
              :{(timeLeft % 60).toString().padStart(2, "0")}
            </span>{" "}
            내에 입력해주세요
          </p>
        </div>

        <BlockButton disabled={enteredCode.length !== 6}>완료</BlockButton>
      </form>
      {/* Todo: 상단 마진 수정 */}
      <p className="text-center text-label-m text-text-primary mt-margin-y-l">
        인증번호가 오지 않았나요?{" "}
        <button onClick={handleResend} className="text-brand-primary underline">
          재발송
        </button>
      </p>
    </div>
  );
}
