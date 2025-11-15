import { createFileRoute } from "@tanstack/react-router";
import BlockButton from "@/components/BlockButton";
import { useState } from "react";
import { UserSchema } from "@/features/user/userSchema";
import { useDebouncedCallback } from "use-debounce";
import InputField from "@/components/InputField";
import { useNavigate } from "@tanstack/react-router";
import StepTitle from "@/features/auth/StepTitle";
import { getNextStepPath } from "@/features/auth/signupSteps";

export const Route = createFileRoute("/(auth)/signup/email")({
  component: Email,
});

export default function Email() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

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
      <div className="my-margin-y-m">
        <StepTitle>이메일을 입력해주세요.</StepTitle>
      </div>

      <form
        className="flex flex-col gap-margin-y-s"
        onSubmit={(e) => {
          e.preventDefault();
          if (!emailError) {
            // Todo: 중복 확인 api 호출 + 로딩 상태 UI 반영
            // 모바일 페이지 전환 애니메이션 관련 이슈로 인해 추가
            if (document.activeElement instanceof HTMLElement) {
              document.activeElement.blur();
            }
            const nextStep = getNextStepPath("email");
            navigate({
              to: nextStep,
            });
          }
        }}
      >
        <div className="my-margin-y-m">
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
            placeholder="이메일을 입력해주세요."
            type="email"
            error={emailError}
          />
        </div>

        <BlockButton disabled={!!emailError || !email}>완료</BlockButton>
      </form>
    </div>
  );
}
