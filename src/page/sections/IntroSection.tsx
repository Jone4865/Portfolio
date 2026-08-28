import IntroContent from 'data/introContent';
import type { IntroSectionProps } from 'types/components/introSection';

import { Invitation, SectionContainer } from '../styles/pageLayout.styles';

export default function IntroSection({ isActive, isDesktop, isTablet }: IntroSectionProps) {
  return (
    <SectionContainer isActive={isActive} isDesktop={isDesktop} isTablet={isTablet}>
      <Invitation isDesktop={isDesktop} isTablet={isTablet}>
        <IntroContent />
      </Invitation>
    </SectionContainer>
  );
}
