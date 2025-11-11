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
  let contentTitle = "";
  switch (step) {
    case "terms":
      headerTitle = "약관 동의";
      contentTitle = "서비스 이용약관에 동의해주세요.";
      content = <Terms />;
      break;
    case "email":
      headerTitle = "본인인증";
      contentTitle = "이메일을 입력해주세요.";
      content = <Email />;
      break;
    case "emailVerification":
      headerTitle = "인증번호 확인";
      contentTitle = `메일로 전송된
      인증번호 6자리를 입력해 주세요.`;
      content = <EmailVerification />;
      break;
    case "password":
      headerTitle = "비밀번호 설정";
      contentTitle = "비밀번호를 설정해주세요.";
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
          initial={{ x: 150, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -150, opacity: 0 }}
          transition={{ ease: "easeOut" }}
          className="w-full h-full"
        >
          <h1 className="whitespace-pre-line text-title-1 text-text-primary my-margin-y-m">
            {contentTitle}
          </h1>
          {content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
