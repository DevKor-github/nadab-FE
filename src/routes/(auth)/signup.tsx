import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";

import Terms from "@/features/auth/Terms";
import Email from "@/features/auth/Email";
import Password from "@/features/auth/Password";
import EmailVerification from "@/features/auth/EmailVerification";
import SubHeader from "@/components/Header";

const sighupStepSchema = z.object({
  step: z
    .enum([
      "terms",
      "email",
      "emailVerification",
      "password",
      "onboarding",
      "category",
      "nickname",
    ])
    .optional()
    .default("terms"),
});

export const Route = createFileRoute("/(auth)/signup")({
  component: RouteComponent,
  validateSearch: zodValidator(sighupStepSchema),
});

function RouteComponent() {
  const { step } = Route.useSearch();
  let content: React.ReactNode;
  let headerTitle = "";
  switch (step) {
    case "terms":
      headerTitle = "약관 동의";
      content = <Terms />;
      break;
    case "email":
      headerTitle = "본인인증";
      content = <Email />;
      break;
    case "emailVerification":
      headerTitle = "인증번호 확인";
      content = <EmailVerification />;
      break;
    case "password":
      headerTitle = "비밀번호 설정";
      content = <Password />;
      break;
    case "onboarding":
    case "category":
    case "nickname":
    default:
      content = <div>Error</div>;
  }
  return (
    // Todo: 뒤로가기 시에는 애니메이션 반대로 줘야 함
    <div>
      <SubHeader>{headerTitle}</SubHeader>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeOut" }}
          className="w-full h-full"
        >
          {content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
