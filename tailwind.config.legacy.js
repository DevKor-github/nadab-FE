/** @type {import('tailwindcss').Config} */
module.exports = {
  // 빌드된 결과물을 스캔하여 필요한 클래스만 추출합니다.
  content: ["./dist/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      // 1. Spacing (Margin, Padding, Gap, Header)
      spacing: {
        "header-height": "48px",
        // Margin/Padding/Gap - Clamp 값 그대로 유지 (v3에서도 작동)
        "margin-x-xs": "clamp(2px, (4 / 390) * 100vw, 4.8px)",
        "margin-y-xs": "clamp(2px, (4 / 796) * 100 * var(--dvh), 4.8px)",
        "margin-x-s": "clamp(4px, (8 / 390) * 100vw, 9.6px)",
        "margin-y-s": "clamp(4px, (8 / 796) * 100 * var(--dvh), 9.6px)",
        "margin-x-m": "clamp(6px, (12 / 390) * 100vw, 14.4px)",
        "margin-y-m": "clamp(6px, (12 / 796) * 100 * var(--dvh), 14.4px)",
        "margin-x-l": "clamp(8px, (16 / 390) * 100vw, 19.2px)",
        "margin-y-l": "clamp(8px, (16 / 796) * 100 * var(--dvh), 19.2px)",
        "margin-x-xl": "clamp(12px, (24 / 390) * 100vw, 28.8px)",
        "margin-y-xl": "clamp(12px, (24 / 796) * 100 * var(--dvh), 28.8px)",
        "margin-x-xxl": "clamp(24px, (48 / 390) * 100vw, 57.6px)",
        "margin-y-xxl": "clamp(24px, (48 / 796) * 100 * var(--dvh), 57.6px)",
        // ... 필요한 만큼 위 패턴대로 추가 가능합니다.
      },

      // 2. Colors (v4 변수를 HEX 값으로 직접 매핑)
      colors: {
        brand: {
          primary: "#5d57f6",
          secondary: "#b5e7ff",
        },
        neutral: {
          1100: "#000000",
          1000: "#1b1c2f",
          900: "#302f42",
          800: "#524a72",
          700: "#67627c",
          600: "#808299",
          500: "#a0a2ad",
          400: "#a4a6b2",
          300: "#bbbfcc",
          200: "#e8ebf2",
          100: "#f7f8ff",
          0: "#ffffff",
        },
        // 시맨틱 컬러 매핑
        surface: {
          base: "#ffffff",
          layer: { 1: "#f7f8ff", 2: "#e8ebf2", 3: "#bbbfcc" },
          muted: "#e8ebf2",
          inverse: "#000000",
        },
        text: {
          primary: "#1b1c2f",
          secondary: "#524a72",
          tertiary: "#808299",
          disabled: "#a4a6b2",
          link: "#5d57f6",
        },
        border: {
          base: "#e8ebf2",
          muted: "#f7f8ff",
        },
        feedback: {
          success: { fg: "#16a34a", bg: "#bbf7d1" },
          warning: { fg: "#d1b400", bg: "#feffc1" },
          error: { fg: "#ef4444", bg: "#fee2e2" },
        },
      },

      // 3. Typography (FontSize + LineHeight 조합)
      fontSize: {
        badge: ["8.25px", { lineHeight: "100%", fontWeight: "700" }],
        hero: ["72px", { lineHeight: "125%", fontWeight: "700" }],
        "headline-l": ["36px", { lineHeight: "125%", fontWeight: "700" }],
        "headline-m": ["32px", { lineHeight: "125%", fontWeight: "700" }],
        "headline-s": ["28px", { lineHeight: "125%", fontWeight: "700" }],
        "title-1": ["24px", { lineHeight: "140%", fontWeight: "700" }],
        "title-2": ["20px", { lineHeight: "140%", fontWeight: "700" }],
        "title-3": ["18px", { lineHeight: "140%", fontWeight: "700" }],
        "label-l": ["16px", { lineHeight: "24px", fontWeight: "700" }],
        "body-1": ["16px", { lineHeight: "180%", fontWeight: "400" }],
        "caption-s": ["11px", { lineHeight: "16px", fontWeight: "400" }],
      },

      // 4. Box Shadows
      boxShadow: {
        1: "0px 2px 4px 0 rgba(0, 0, 0, 0.1)",
        2: "0px 4px 12px 0 rgba(0, 0, 0, 0.1)",
        "button-1":
          "inset 0px 4px 3px 0px rgba(255, 255, 255, 0.4), 0px 8px 12px 0px rgba(23, 17, 168, 0.15)",
      },
    },
  },
  // plugins: [require("tailwindcss-animate")],
};
