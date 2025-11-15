import { useLocation, createFileRoute } from "@tanstack/react-router";
import { GetCurrentStep, type StepId } from "@/features/auth/signupSteps";
import { AnimatePresence } from "motion/react";
import { AnimatedOutlet } from "@/components/AnimatedOutlet";

export const Route = createFileRoute("/(auth)/signup")({
  component: SignupLayout,
});

function SignupLayout() {
  const location = useLocation();
  const path = location.pathname.split("/signup/")[1] as StepId;
  const currentStep = GetCurrentStep(path);

  // /onboarding으로 넘어가기 전에 잠시 에러 뜨는 문제 때문에 넣어둠
  // 빼지 말 것
  if (!currentStep) {
    return null;
  }

  return (
    <div className="h-full flex flex-col">
      {currentStep.header}
      <AnimatePresence mode="wait" initial={false}>
        <AnimatedOutlet key={location.pathname} />
      </AnimatePresence>
    </div>
  );
}
