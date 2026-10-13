import type { AppTheme } from 'types/theme';

/**
 * 3D 키보드 디자인 팔레트 — 스튜디오 조명 아래의 어두운 바탕 + 오렌지 액센트 키캡.
 * 라이트 모드는 같은 톤을 종이 질감 바탕으로 옮긴 버전입니다.
 */
const FONT_SANS =
  '"IBM Plex Sans KR", "Apple SD Gothic Neo", "Noto Sans KR", system-ui, -apple-system, sans-serif';
const FONT_MONO =
  '"JetBrains Mono", "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

export const lightTheme: AppTheme = {
  colorScheme: 'light',
  background: '#f3f1ec',
  canvasGradient: `
    radial-gradient(60% 55% at 72% 38%, rgba(226, 67, 26, 0.07), transparent 70%),
    radial-gradient(40% 40% at 20% 10%, rgba(90, 100, 140, 0.06), transparent 70%)
  `,
  text: '#141416',
  textMuted: '#6d6c68',
  textSoft: '#3a3936',
  textFaint: '#a3a19b',
  siderBackGround: '#faf9f6',
  siderGradient: 'linear-gradient(180deg, #fbfaf7 0%, #f5f3ee 100%)',
  siderBorder: 'rgba(20, 20, 22, 0.09)',
  siderArrowColor: 'rgba(20, 20, 22, 0.04)',
  arrowBackGround: '#141416',
  arrowText: '#f3f1ec',
  panel: '#ffffff',
  cardColor: '#ffffff',
  cardText: '#141416',
  cardTextMuted: '#4a4945',
  cardBorder: 'rgba(20, 20, 22, 0.09)',
  lineStrong: 'rgba(20, 20, 22, 0.16)',
  caedSubTExt: 'rgba(20, 20, 22, 0.45)',
  accent: '#c93a12',
  accentMuted: 'rgba(226, 67, 26, 0.16)',
  accentContrast: '#ffffff',
  progressGradient: 'linear-gradient(90deg, #ff7a50, #c93a12)',
  indicatorRail: 'rgba(255, 255, 255, 0.72)',
  indicatorDot: 'rgba(20, 20, 22, 0.24)',
  heroTypingColor: '#141416',
  heroGlassBorder: 'rgba(20, 20, 22, 0.12)',
  heroGlassBg: 'rgba(255, 255, 255, 0.6)',
  shadowCard: '0 1px 0 rgba(255,255,255,0.8) inset, 0 24px 48px -28px rgba(20, 20, 22, 0.28)',
  shadowElevated: '0 30px 60px -30px rgba(20, 20, 22, 0.35)',
  chipBg: 'rgba(20, 20, 22, 0.03)',
  chipBorder: 'rgba(20, 20, 22, 0.14)',
  inputBg: '#ffffff',
  inputBorder: 'rgba(20, 20, 22, 0.12)',
  inputBorderHover: 'rgba(201, 58, 18, 0.45)',
  inputDisabledBg: '#ebe8e4',
  fontSans: FONT_SANS,
  fontMono: FONT_MONO,
};

export const darkTheme: AppTheme = {
  colorScheme: 'dark',
  background: '#0a0a0b',
  canvasGradient: `
    radial-gradient(60% 55% at 72% 42%, rgba(255, 110, 60, 0.09), transparent 70%),
    radial-gradient(40% 40% at 20% 10%, rgba(120, 130, 170, 0.06), transparent 70%)
  `,
  text: '#f3f1ec',
  textMuted: '#8b8a86',
  textSoft: '#c9c7c1',
  textFaint: '#5b5a57',
  siderBackGround: '#0e0e10',
  siderGradient: 'linear-gradient(180deg, #111113 0%, #0c0c0d 100%)',
  siderBorder: 'rgba(255, 255, 255, 0.08)',
  siderArrowColor: 'rgba(255, 255, 255, 0.04)',
  arrowBackGround: '#f3f1ec',
  arrowText: '#0b0b0c',
  panel: '#141416',
  cardColor: '#141416',
  cardText: '#f3f1ec',
  cardTextMuted: '#c9c7c1',
  cardBorder: 'rgba(255, 255, 255, 0.08)',
  lineStrong: 'rgba(255, 255, 255, 0.14)',
  caedSubTExt: 'rgba(243, 241, 236, 0.45)',
  accent: '#ff5a2c',
  accentMuted: 'rgba(255, 90, 44, 0.16)',
  accentContrast: '#1a0803',
  progressGradient: 'linear-gradient(90deg, #ff7a50, #ff5a2c)',
  indicatorRail: 'rgba(20, 20, 22, 0.72)',
  indicatorDot: 'rgba(255, 255, 255, 0.26)',
  heroTypingColor: '#f3f1ec',
  heroGlassBorder: 'rgba(255, 255, 255, 0.14)',
  heroGlassBg: 'rgba(10, 10, 11, 0.5)',
  shadowCard: '0 1px 0 rgba(255,255,255,0.03) inset, 0 30px 60px -30px rgba(0, 0, 0, 0.9)',
  shadowElevated: '0 40px 80px -30px rgba(0, 0, 0, 0.95)',
  chipBg: 'rgba(255, 255, 255, 0.03)',
  chipBorder: 'rgba(255, 255, 255, 0.14)',
  inputBg: 'rgba(255, 255, 255, 0.06)',
  inputBorder: 'rgba(255, 255, 255, 0.12)',
  inputBorderHover: 'rgba(255, 90, 44, 0.5)',
  inputDisabledBg: 'rgba(255, 255, 255, 0.04)',
  fontSans: FONT_SANS,
  fontMono: FONT_MONO,
};
