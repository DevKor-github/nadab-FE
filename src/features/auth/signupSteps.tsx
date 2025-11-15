import SubHeader from "@/components/Header";

export const signupSteps = [
  {
    id: "terms",
    path: "/signup/terms",
    header: <SubHeader>약관 동의</SubHeader>,
  },
  {
    id: "email",
    path: "/signup/email",
    header: <SubHeader>본인인증</SubHeader>,
  },
  {
    id: "emailVerification",
    path: "/signup/emailVerification",
    header: <SubHeader>인증번호 확인</SubHeader>,
  },
  {
    id: "password",
    path: "/signup/password",
    header: <SubHeader>비밀번호 설정</SubHeader>,
  },
] as const;

export type StepId = (typeof signupSteps)[number]["id"];

export function GetCurrentStep(currentStepId: StepId) {
  const currentStepIdx = signupSteps.findIndex(
    (step) => step.id === currentStepId
  );
  return signupSteps[currentStepIdx];
}

export function getNextStepPath(currentStepId: StepId) {
  const currentStepIdx = signupSteps.findIndex(
    (step) => step.id === currentStepId
  );
  const nextStep = signupSteps[currentStepIdx + 1];
  return nextStep.path;
}
