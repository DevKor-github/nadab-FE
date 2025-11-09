import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="min-h-dvh w-vw flex">
        <div className="w-dvw sm:w-[412px] sm: sm:mx-auto px-padding-x-m sm:px-4 sm:pb-4 bg-white overflow-x-hidden">
          <Outlet />
        </div>
      </div>

      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  );
}
