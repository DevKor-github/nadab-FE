// import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import "./styles.css";
import reportWebVitals from "./reportWebVitals.ts";
import type { AxiosError } from "axios";
import type { ApiErrResponse } from "./generated/api.ts";
import useModalStore from "./store/modalStore.ts";

const queryClient = new QueryClient({
  // 테스트용
  defaultOptions: {
    queries: {
      networkMode: "always",
    },
    mutations: {
      networkMode: "always",
    },
  },
  queryCache: new QueryCache({
    onError: (err) => {
      const error = err as AxiosError<ApiErrResponse<null>>;
      console.log(error);
      const isNetworkError = error.code === "ERR_NETWORK";
      if (isNetworkError) {
        useModalStore
          .getState()
          .showError(
            "네트워크 연결이 불안정해요.",
            "네트워크 확인 후 다시 시도해주세요.",
          );
      } else {
        useModalStore
          .getState()
          .showError(
            error.response?.data?.code ?? error.message,
            error.response?.data?.message ?? "알 수 없는 에러가 발생했습니다.",
          );
      }
    },
  }),
});

// Create a new router instance
const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: "intent",
  scrollRestoration: false,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    //<StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
    // </StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
