import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { fileURLToPath, URL } from "node:url";
import legacy from "@vitejs/plugin-legacy";
import TailwindLegacyPlugin from "vite-plugin-tailwind-legacy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    viteReact(),
    tailwindcss(),
    legacy({
      targets: ["chrome >= 80"], // api 30 이상 대응
      modernPolyfills: true,
    }),
    TailwindLegacyPlugin({
      // 레거시용 설정 파일 이름 (3단계에서 만들 예정)
      tailwindConfig: "tailwind.config.legacy.js",
      // HTML에 브라우저 체크 스크립트 자동 삽입 여부
      injectInHTML: true,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://nadab-dev.n-e.kr",
        changeOrigin: true,
      },
    },
  },
});
