export type SkillRadarItem = {
  label: string;
  value: number;
};

export const skillRadar: SkillRadarItem[] = [
  { label: 'React', value: 92 },
  { label: 'Next.js', value: 88 },
  { label: 'Vue 3', value: 82 },
  { label: 'TypeScript', value: 90 },
  { label: 'UI/UX', value: 84 },
  { label: 'Architecture', value: 80 },
];

export const skillStats = {
  months: 44,
  projects: 14,
  coreFrameworks: 3,
} as const;

export function polarToCartesian(cx: number, cy: number, radius: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

export function buildRadarPath(values: number[], size: number) {
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.34;
  const step = 360 / values.length;

  return values
    .map((value, index) => {
      const point = polarToCartesian(cx, cy, (value / 100) * maxR, index * step);
      return `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
    })
    .join(' ')
    .concat(' Z');
}
