import type { Project } from 'types/project';
import type { ResponsiveFlags, SectionLayoutProps } from 'types/section';

export type ProjectCardProps = SectionLayoutProps &
  Pick<ResponsiveFlags, 'isMobile'> & {
    project: Project;
    /** 0부터 시작하는 프로젝트 순서 — 모노 인덱스와 팔레트 이동(flash)에 사용 */
    index?: number;
    total?: number;
  };
