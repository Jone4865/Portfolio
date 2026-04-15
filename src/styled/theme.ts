export type AppTheme = {
  /** `color-scheme` — 스크롤바·폼 컨트롤 등 UA 톤 */
  colorScheme: "light" | "dark";
  background: string;
  canvasGradient: string;
  text: string;
  textMuted: string;
  siderBackGround: string;
  siderBorder: string;
  siderArrowColor: string;
  arrowBackGround: string;
  arrowText: string;
  cardColor: string;
  cardText: string;
  cardTextMuted: string;
  cardBorder: string;
  /** 레거시 필드 — 미사용 시에도 타입 호환용 */
  caedSubTExt: string;
  accent: string;
  accentMuted: string;
  accentContrast: string;
  progressGradient: string;
  indicatorRail: string;
  indicatorDot: string;
  heroTypingColor: string;
  heroGlassBorder: string;
  heroGlassBg: string;
  shadowCard: string;
  shadowElevated: string;
  chipBg: string;
  chipBorder: string;
  inputBg: string;
  inputBorder: string;
  inputBorderHover: string;
  inputDisabledBg: string;
  fontSans: string;
};

export const lightTheme: AppTheme = {
  colorScheme: "light",
  background: "#ede8e3",
  canvasGradient: `
    radial-gradient(1200px 800px at 85% 10%, rgba(184, 50, 83, 0.09), transparent 55%),
    radial-gradient(900px 600px at 0% 100%, rgba(59, 130, 246, 0.06), transparent 50%),
    linear-gradient(180deg, #f5f1ed 0%, #e8e2dc 100%)
  `,
  text: "#14161c",
  textMuted: "rgba(20, 22, 28, 0.55)",
  siderBackGround: "rgba(255, 252, 249, 0.94)",
  siderBorder: "rgba(20, 22, 28, 0.08)",
  siderArrowColor: "rgba(20, 22, 28, 0.05)",
  arrowBackGround: "#14161c",
  arrowText: "#faf8f6",
  cardColor: "rgba(255, 255, 255, 0.88)",
  cardText: "#14161c",
  cardTextMuted: "rgba(20, 22, 28, 0.62)",
  cardBorder: "rgba(20, 22, 28, 0.08)",
  caedSubTExt: "rgba(20, 22, 28, 0.45)",
  accent: "#b83253",
  accentMuted: "rgba(184, 50, 83, 0.2)",
  accentContrast: "#ffffff",
  progressGradient: "linear-gradient(90deg, #b83253, #c2410c)",
  indicatorRail: "rgba(20, 22, 28, 0.06)",
  indicatorDot: "rgba(20, 22, 28, 0.28)",
  heroTypingColor: "#3d2a2f",
  heroGlassBorder: "rgba(255, 255, 255, 0.55)",
  heroGlassBg: "rgba(255, 255, 255, 0.35)",
  shadowCard: "0 4px 24px rgba(20, 22, 28, 0.06), 0 24px 48px rgba(20, 22, 28, 0.08)",
  shadowElevated: "0 12px 40px rgba(20, 22, 28, 0.12)",
  chipBg: "rgba(184, 50, 83, 0.08)",
  chipBorder: "rgba(184, 50, 83, 0.22)",
  inputBg: "#ffffff",
  inputBorder: "rgba(20, 22, 28, 0.12)",
  inputBorderHover: "rgba(184, 50, 83, 0.45)",
  inputDisabledBg: "#ebe8e4",
  fontSans:
    '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
};

export const darkTheme: AppTheme = {
  colorScheme: "dark",
  background: "#0c0e12",
  canvasGradient: `
    radial-gradient(1000px 700px at 90% 0%, rgba(251, 113, 133, 0.12), transparent 50%),
    radial-gradient(800px 500px at 0% 90%, rgba(56, 189, 248, 0.08), transparent 45%),
    linear-gradient(165deg, #0f1117 0%, #12151c 50%, #0c0e12 100%)
  `,
  text: "#ececf0",
  textMuted: "rgba(236, 236, 240, 0.55)",
  siderBackGround: "rgba(18, 20, 28, 0.92)",
  siderBorder: "rgba(255, 255, 255, 0.06)",
  siderArrowColor: "rgba(255, 255, 255, 0.06)",
  arrowBackGround: "#ececf0",
  arrowText: "#0c0e12",
  cardColor: "rgba(22, 26, 36, 0.82)",
  cardText: "#f1f2f5",
  cardTextMuted: "rgba(241, 242, 245, 0.65)",
  cardBorder: "rgba(255, 255, 255, 0.08)",
  caedSubTExt: "rgba(241, 242, 245, 0.45)",
  accent: "#fb7185",
  accentMuted: "rgba(251, 113, 133, 0.25)",
  accentContrast: "#1a0508",
  progressGradient: "linear-gradient(90deg, #fb7185, #f97316)",
  indicatorRail: "rgba(255, 255, 255, 0.08)",
  indicatorDot: "rgba(255, 255, 255, 0.35)",
  heroTypingColor: "#fde8ec",
  heroGlassBorder: "rgba(255, 255, 255, 0.12)",
  heroGlassBg: "rgba(12, 14, 18, 0.45)",
  shadowCard: "0 0 0 1px rgba(255,255,255,0.06), 0 24px 48px rgba(0, 0, 0, 0.45)",
  shadowElevated: "0 20px 50px rgba(0, 0, 0, 0.5)",
  chipBg: "rgba(251, 113, 133, 0.1)",
  chipBorder: "rgba(251, 113, 133, 0.28)",
  inputBg: "rgba(255, 255, 255, 0.06)",
  inputBorder: "rgba(255, 255, 255, 0.12)",
  inputBorderHover: "rgba(251, 113, 133, 0.5)",
  inputDisabledBg: "rgba(255, 255, 255, 0.04)",
  fontSans:
    '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
};
