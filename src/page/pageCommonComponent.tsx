import { useState } from 'react';
import styled from 'styled-components';

import Button from '../component/button';
import Input from '../component/input';
import TextArea from '../component/textArea';
import CheckBox from '../component/checkBox';
import RadioButton from '../component/radio';
import InputWithIcon from '../component/inputWithIcon';
import CardExpand from '../component/CardExpand';
import CardGallery from '../component/CardGallery';
import useResponsive from '../hooks/useResponsive';

const SIDER_RAIL = 320;

function PageCommonComponent() {
  const { isDesktop, isTablet } = useResponsive();
  const [errorText, setErrorText] = useState('');

  return (
    <Page isDesktop={isDesktop} isTablet={isTablet}>
      <PageHeader>
        <Eyebrow>Design system</Eyebrow>
        <h1>UI 컴포넌트</h1>
        <Lead>
          버튼·폼·카드 등 공용 컴포넌트의 상태를 한 화면에서 확인합니다. 라이트/다크
          전환과 함께 대조해 보세요.
        </Lead>
      </PageHeader>

      <Section>
        <SectionTitle>Button</SectionTitle>
        <DemoRow>
          <Button disabled onClick={() => undefined}>
            Disabled
          </Button>
          <Button onClick={() => undefined}>Normal</Button>
          <Button buttonType="outline" onClick={() => undefined}>
            Outline
          </Button>
        </DemoRow>
      </Section>

      <Section>
        <SectionTitle>Input</SectionTitle>
        <DemoStack>
          <Input placeholder="disabled" disabled />
          <Input
            onChange={(e) => setErrorText(e.target.value)}
            placeholder="에러 (값을 비우면 에러)"
            error={!errorText}
          />
          <Input placeholder="normal" />
        </DemoStack>
      </Section>

      <Section>
        <SectionTitle>TextArea</SectionTitle>
        <DemoStack>
          <TextArea placeholder="disabled" disabled />
          <TextArea
            onChange={(e) => setErrorText(e.target.value)}
            placeholder="에러 (값을 비우면 에러)"
            error={!errorText}
          />
          <TextArea placeholder="normal" />
        </DemoStack>
      </Section>

      <TwoCol>
        <Section>
          <SectionTitle>CheckBox</SectionTitle>
          <DemoStack>
            <CheckBox placeholder="disabled" disabled />
            <CheckBox error />
            <CheckBox placeholder="normal" />
          </DemoStack>
        </Section>
        <Section>
          <SectionTitle>Radio</SectionTitle>
          <DemoStack>
            <RadioButton placeholder="disabled" disabled />
            <RadioButton error />
            <RadioButton placeholder="normal" />
          </DemoStack>
        </Section>
      </TwoCol>

      <Section>
        <SectionTitle>Input With Icon</SectionTitle>
        <DemoStack>
          <InputWithIcon />
          <InputWithIcon disabled />
          <InputWithIcon error />
        </DemoStack>
      </Section>

      <Section>
        <SectionTitle>Card Expand</SectionTitle>
        <CardShell>
          <CardExpand />
        </CardShell>
      </Section>

      <Section>
        <SectionTitle>Card Gallery</SectionTitle>
        <GalleryShell>
          <CardGallery />
        </GalleryShell>
      </Section>
    </Page>
  );
}

export default PageCommonComponent;

const Page = styled.main<{ isDesktop: boolean; isTablet: boolean }>`
  min-height: 100vh;
  margin-left: ${({ isDesktop, isTablet }) =>
    isDesktop || isTablet ? `${SIDER_RAIL}px` : '0'};
  padding: ${({ isDesktop, isTablet }) =>
    isDesktop ? '44px 48px 96px' : isTablet ? '36px 28px 72px' : '28px 20px 64px'};
  max-width: ${({ isDesktop, isTablet }) =>
    isDesktop || isTablet ? `min(1040px, calc(100vw - ${SIDER_RAIL}px - 56px))` : '100%'};
  background: ${({ theme }) => theme.canvasGradient};
`;

const PageHeader = styled.header`
  margin-bottom: 48px;
  padding-bottom: 32px;
  border-bottom: 1px solid ${({ theme }) => theme.siderBorder};

  h1 {
    margin: 8px 0 14px;
    font-size: clamp(1.75rem, 3vw, 2.25rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    color: ${({ theme }) => theme.text};
  }
`;

const Eyebrow = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.accent};
`;

const Lead = styled.p`
  margin: 0;
  max-width: 48ch;
  font-size: 15px;
  line-height: 1.65;
  color: ${({ theme }) => theme.textMuted};
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  margin: 0 0 18px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textMuted};
`;

const DemoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
`;

const DemoStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 420px;
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const CardShell = styled.div`
  padding: 20px;
  border-radius: 18px;
  border: 1px solid ${({ theme }) => theme.cardBorder};
  background: ${({ theme }) => theme.cardColor};
  box-shadow: ${({ theme }) => theme.shadowCard};
`;

const GalleryShell = styled.div`
  min-height: 440px;
  padding: 28px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.cardBorder};
  background: ${({ theme }) => theme.cardColor};
  color: ${({ theme }) => theme.cardText};
  box-shadow: ${({ theme }) => theme.shadowCard};
`;
