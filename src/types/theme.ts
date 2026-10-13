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
  /** 3D 키보드 디자인 — 모노 폰트(라벨·인덱스·키캡) */
  fontMono: string;
  /** 카드·팔레트 패널 바탕 */
  panel: string;
  /** 보조 본문 색 */
  textSoft: string;
  /** 가장 약한 텍스트(구분점·플레이스홀더) */
  textFaint: string;
  /** 강한 구분선 */
  lineStrong: string;
};
