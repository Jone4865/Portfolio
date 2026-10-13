export const pageIndicatorSections = [
  { id: 'home', label: 'Home', index: 0 },
  { id: 'intro', label: 'Intro', index: 1 },
] as const;

/** 프로젝트 카드 뒤 섹션 — offset은 마지막 프로젝트 다음부터의 순서 */
export const pageIndicatorTrailingSections = [
  { id: 'earlier', label: 'Earlier', ariaLabel: '이전 프로젝트', offset: 0 },
  { id: 'ai', label: 'AI', ariaLabel: 'AI와 함께 일하는 방식', offset: 1 },
] as const;
