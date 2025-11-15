import StepTitle from "@/features/auth/StepTitle";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/onboarding/profile")({
  component: Profile,
});

function Profile() {
  return (
    <div>
      <div className="py-margin-y-m">
        <StepTitle>프로필을 설정해주세요.</StepTitle>
      </div>
      <div></div>
      <div></div>
    </div>
  );
}
