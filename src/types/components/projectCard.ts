import type { Project } from 'types/project';
import type { ResponsiveFlags, SectionLayoutProps } from 'types/section';

export type ProjectCardProps = SectionLayoutProps &
  Pick<ResponsiveFlags, 'isMobile'> & {
    project: Project;
  };
