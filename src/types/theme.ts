export type AppTheme = {
  /** `color-scheme` — 스크롤바·폼 컨트롤 등 UA 톤 */
  colorScheme: 'light' | 'dark';
  background: string;
  canvasGradient: string;
  text: string;
  textMuted: string;
  siderBackGround: string;
  siderGradient: string;
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
