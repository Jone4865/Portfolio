/** 사이드바 레일 너비 — sider·페이지 레이아웃 공통 */
export const SIDER_RAIL = 300;

/** skip link 대상 main landmark id */
export const MAIN_CONTENT_ID = 'main-content';

/** Home + Intro — 프로젝트 카드 앞 섹션 수 */
export const SECTION_BASE = 2;

/** 프로젝트 카드 뒤 섹션 수 — 그 전의 작업 + AI와 함께 일하는 방식 */
export const TRAILING_SECTIONS = 2;

/** 전체 풀페이지 섹션 수 */
export const getTotalSections = (projectCount: number) =>
  SECTION_BASE + projectCount + TRAILING_SECTIONS;

export const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];
