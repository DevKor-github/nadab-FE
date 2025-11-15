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

  return (
    <div className="h-full flex flex-col">
      {currentStep.header}
      <AnimatePresence mode="wait" initial={false}>
        <AnimatedOutlet key={currentStep.id} />
      </AnimatePresence>
    </div>
  );
}
