import type { Project } from 'types';
import { easeOutExpo } from 'constants/layout';
import {
  cardRevealVariants,
  stackChipVariants,
  stackParentVariants,
} from '../animations/projectCardVariants';
import {
  CardHeader,
  CardMeta,
  CardTitle,
  CardWrapper,
  ExperienceList,
  ExternalLink,
  LineOne,
  LinkBlock,
  MetaBlock,
  MetaLabel,
  MetaValue,
  OrgPill,
  SectionContainer,
  StackChip,
  StackRow,
} from '../styles/pageLayout.styles';

type Props = {
  project: Project;
  isActive: boolean;
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
};

export default function ProjectCard({
  project,
  isActive,
  isDesktop,
  isTablet,
  isMobile,
}: Props) {
  return (
    <SectionContainer isActive={isActive} isDesktop={isDesktop} isTablet={isTablet}>
      <CardWrapper
        isDesktop={isDesktop}
        isTablet={isTablet}
        isMobile={isMobile}
        initial={false}
        variants={cardRevealVariants}
        animate={isActive ? 'on' : 'off'}
        whileHover={{ y: -4, transition: { duration: 0.22, ease: easeOutExpo } }}
      >
        <CardHeader>
          <OrgPill>{project.key}</OrgPill>
          <LineOne isDesktop={isDesktop}>
            <CardTitle>{project.title}</CardTitle>
            <CardMeta>{project.date}</CardMeta>
          </LineOne>
        </CardHeader>
        <MetaBlock>
          <MetaLabel>목적</MetaLabel>
          <MetaValue>{project.subTitle}</MetaValue>
        </MetaBlock>
        <MetaBlock>
          <MetaLabel>인원</MetaLabel>
          <MetaValue>{project.people}</MetaValue>
        </MetaBlock>
        <MetaBlock>
          <MetaLabel>경험</MetaLabel>
          <ExperienceList>
            {project.experience.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ExperienceList>
        </MetaBlock>
        <StackRow
          aria-label="기술 스택"
          initial={false}
          variants={stackParentVariants}
          animate={isActive ? 'on' : 'off'}
        >
          {project.stack.map((item) => (
            <StackChip
              key={item.name}
              data-stack-chip={isActive ? 'active' : undefined}
              variants={stackChipVariants}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            >
              <span className="ico">{item.icon}</span>
              <span className="lbl">{item.name}</span>
            </StackChip>
          ))}
        </StackRow>
        {project.link && project.link.length > 0 && (
          <LinkBlock>
            {project.link.map((item) => (
              <ExternalLink
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="lbl">{item.name}</span>
                <span className="arrow" aria-hidden>
                  ↗
                </span>
              </ExternalLink>
            ))}
          </LinkBlock>
        )}
      </CardWrapper>
    </SectionContainer>
  );
}
