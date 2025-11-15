import { useLocation, createFileRoute } from "@tanstack/react-router";
import { GetCurrentStep, type StepId } from "@/features/auth/signupSteps";
import { AnimatePresence } from "motion/react";
import { AnimatedOutlet } from "@/components/AnimatedOutlet";

export const Route = createFileRoute("/(auth)/onboarding")({
  component: OnboardingLayout,
});

function OnboardingLayout() {
  const location = useLocation();
  const path = location.pathname.split("/onboarding/")[1] as StepId;
  const currentStep = GetCurrentStep(path);

  return (
    <div className="h-full flex flex-col">
      {currentStep.header}
      <AnimatePresence mode="wait">
        <AnimatedOutlet key={location.pathname} />
      </AnimatePresence>
    </div>
  );
}
