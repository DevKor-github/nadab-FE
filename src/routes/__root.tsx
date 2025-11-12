import { createRootRoute } from "@tanstack/react-router";
import { useMatches, useMatch } from "@tanstack/react-router";
import { AnimatePresence } from "motion/react";
import { AnimatedOutlet } from "@/components/AnimatedOutlet";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const matches = useMatches();
  const match = useMatch({ strict: false });
  const nextMatchIndex = matches.findIndex((d) => d.id === match.id) + 1;
  const nextMatch = matches[nextMatchIndex];
  return (
    <>
      <div className="min-h-dvh w-vw flex bg-surface-base">
        {/* 하단 패딩 넣은 이유 - 모바일 사파리 하단바 때문에 안 띄우면 이상함ㅜㅜ */}
        <div className="w-dvw sm:w-[412px] sm:mx-auto px-padding-x-m pb-padding-y-m overflow-x-hidden">
          {/* 페이지 전환 시 애니메이션 위해 */}
          {/* 이하 애니메이션 필요한 페이지는 motion.div로 시작해야 함. */}
          <AnimatePresence mode="popLayout" initial={false}>
            <AnimatedOutlet key={nextMatch?.id || match.id} />
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
