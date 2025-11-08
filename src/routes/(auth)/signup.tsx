import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import BlockButton from "@/components/BlockButton";
import Terms from "@/features/auth/terms";

const sighupStepSchema = z.object({
  step: z
    .enum(["terms", "email", "password", "onboarding", "category", "nickname"])
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
  switch (step) {
    case "terms":
      content = <Terms />;
      break;
    case "email":
      content = <div>Email</div>;
      break;
    default:
      content = <div>Error</div>;
  }
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={step}
        initial={{ x: 150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -150, opacity: 0 }}
        transition={{ ease: "easeOut" }}
        className="w-full h-full bg-blue-50"
      >
        {content}
        <Link to="/signup" search={{ step: "email" }}>
          <BlockButton>완료</BlockButton>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
