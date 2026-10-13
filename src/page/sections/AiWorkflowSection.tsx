import { aiWorkflow } from 'data/aiWorkflow';
import type { ResponsiveFlags, SectionLayoutProps } from 'types/section';

import { cardRevealVariants } from '../animations/projectCardVariants';
import { Closing, Lead, PrincipleList, UsageList } from '../styles/extraSections.styles';
import {
  CardHeader,
  CardTitle,
  CardWrapper,
  ExperienceList,
  ExternalLink,
  LinkBlock,
  MetaBlock,
  MetaLabel,
  OrgPill,
  SectionContainer,
} from '../styles/pageLayout.styles';

type AiWorkflowSectionProps = SectionLayoutProps & Pick<ResponsiveFlags, 'isMobile'>;

export default function AiWorkflowSection({
  isActive,
  isDesktop,
  isTablet,
  isMobile,
}: AiWorkflowSectionProps) {
  const { title, pill, lead, usage, productivity, principles, closing, link } = aiWorkflow;

  return (
    <SectionContainer $isActive={isActive} $isDesktop={isDesktop} $isTablet={isTablet}>
      <CardWrapper
        role="region"
        aria-labelledby="ai-workflow-title"
        $isDesktop={isDesktop}
        $isTablet={isTablet}
        $isMobile={isMobile}
        initial={false}
        variants={cardRevealVariants}
        animate={isActive ? 'on' : 'off'}
      >
        <CardHeader>
          <OrgPill>{pill}</OrgPill>
          <CardTitle id="ai-workflow-title">{title}</CardTitle>
        </CardHeader>

        <Lead>{lead}</Lead>

        <MetaBlock>
          <MetaLabel as="h3">쓰는 방식</MetaLabel>
          <UsageList>
            {usage.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.text}</dd>
              </div>
            ))}
          </UsageList>
        </MetaBlock>

        <MetaBlock>
          <MetaLabel as="h3">팀 생산성</MetaLabel>
          <ExperienceList>
            {productivity.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ExperienceList>
        </MetaBlock>

        <MetaBlock>
          <MetaLabel as="h3">원칙</MetaLabel>
          <PrincipleList>
            {principles.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </PrincipleList>
        </MetaBlock>

        <Closing>{closing}</Closing>
        <LinkBlock>
          <ExternalLink
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="lbl">{link.name}</span>
            <span className="arrow" aria-hidden>
              ↗
            </span>
          </ExternalLink>
        </LinkBlock>
      </CardWrapper>
    </SectionContainer>
  );
}
