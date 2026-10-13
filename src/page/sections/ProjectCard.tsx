import { useCardTilt } from 'hooks';
import type { ProjectCardProps } from 'types/components/projectCard';

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
  HeaderTop,
  LineOne,
  LinkBlock,
  MetaBlock,
  MetaLabel,
  MetaValue,
  OrgPill,
  SecIdx,
  SectionContainer,
  StackChip,
  StackRow,
  TiltShell,
} from '../styles/pageLayout.styles';

const pad2 = (n: number) => String(n).padStart(2, '0');

export default function ProjectCard({
  project,
  isActive,
  isDesktop,
  isTablet,
  isMobile,
  index = 0,
  total,
}: ProjectCardProps) {
  const tilt = useCardTilt<HTMLDivElement>();

  return (
    <SectionContainer $isActive={isActive} $isDesktop={isDesktop} $isTablet={isTablet}>
      <TiltShell
        ref={tilt.ref}
        id={`project-card-${index}`}
        onPointerMove={tilt.onPointerMove}
        onPointerLeave={tilt.onPointerLeave}
      >
        <CardWrapper
          $isDesktop={isDesktop}
          $isTablet={isTablet}
          $isMobile={isMobile}
          initial={false}
          variants={cardRevealVariants}
          animate={isActive ? 'on' : 'off'}
        >
          <CardHeader>
            <HeaderTop>
              <OrgPill>{project.key}</OrgPill>
              <SecIdx aria-hidden>
                {pad2(index + 1)}
                {total ? ` / ${pad2(total)}` : ''} · Project
              </SecIdx>
            </HeaderTop>
            <LineOne $isDesktop={isDesktop}>
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
                whileHover={{ y: -2 }}
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
                  whileHover={{ y: -2 }}
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
      </TiltShell>
    </SectionContainer>
  );
}
