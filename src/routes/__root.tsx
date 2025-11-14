import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="min-h-dvh w-vw flex bg-surface-base">
        {/* 하단 패딩 넣은 이유 - 모바일 사파리 하단바 때문에 안 띄우면 이상함ㅜㅜ */}
        <div className="w-dvw sm:w-[412px] sm:mx-auto px-padding-x-m pb-padding-y-m overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </>
  );
}
