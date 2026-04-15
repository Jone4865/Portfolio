import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaChevronRight } from 'react-icons/fa';

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

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const listParent = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.055, delayChildren: 0.04 },
  },
};

const listItem = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: easeOut },
  },
};

function PageCommonComponent() {
  const { isDesktop, isTablet } = useResponsive();
  const [errorText, setErrorText] = useState('');

  return (
    <Page isDesktop={isDesktop} isTablet={isTablet}>
      <BackdropGrid aria-hidden />

      <PageHeader>
        <HeaderTop>
          <BackLink to="/">
            <span className="lbl">포트폴리오</span>
            <FaChevronRight className="ico" aria-hidden />
            <span className="cur">컴포넌트</span>
          </BackLink>
        </HeaderTop>
        <Eyebrow>Design system</Eyebrow>
        <h1>UI 컴포넌트</h1>
        <Lead>
          버튼·폼·카드 등 공용 컴포넌트의 상태를 한 화면에서 확인합니다. 라이트/다크
          전환과 함께 대조해 보세요.
        </Lead>
        <HeaderAccent aria-hidden />
      </PageHeader>

      <motion.div
        variants={listParent}
        initial="hidden"
        animate="show"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <motion.div variants={listItem}>
          <Surface>
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
          </Surface>
        </motion.div>

        <motion.div variants={listItem}>
          <Surface>
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
          </Surface>
        </motion.div>

        <motion.div variants={listItem}>
          <Surface>
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
          </Surface>
        </motion.div>

        <motion.div variants={listItem}>
          <TwoCol>
            <Surface>
              <SectionTitle>CheckBox</SectionTitle>
              <DemoStack>
                <CheckBox placeholder="disabled" disabled />
                <CheckBox error />
                <CheckBox placeholder="normal" />
              </DemoStack>
            </Surface>
            <Surface>
              <SectionTitle>Radio</SectionTitle>
              <DemoStack>
                <RadioButton placeholder="disabled" disabled />
                <RadioButton error />
                <RadioButton placeholder="normal" />
              </DemoStack>
            </Surface>
          </TwoCol>
        </motion.div>

        <motion.div variants={listItem}>
          <Surface>
            <SectionTitle>Input With Icon</SectionTitle>
            <DemoStack>
              <InputWithIcon />
              <InputWithIcon disabled />
              <InputWithIcon error />
            </DemoStack>
          </Surface>
        </motion.div>

        <motion.div variants={listItem}>
          <Surface $tall>
            <SectionTitle>Card Expand</SectionTitle>
            <CardInset>
              <CardExpand />
            </CardInset>
          </Surface>
        </motion.div>

        <motion.div variants={listItem}>
          <Surface $tall>
            <SectionTitle>Card Gallery</SectionTitle>
            <GalleryInset>
              <CardGallery />
            </GalleryInset>
          </Surface>
        </motion.div>
      </motion.div>
    </Page>
  );
}

export default PageCommonComponent;

const Page = styled.main<{ isDesktop: boolean; isTablet: boolean }>`
  position: relative;
  min-height: 100vh;
  margin-left: ${({ isDesktop, isTablet }) =>
    isDesktop || isTablet ? `${SIDER_RAIL}px` : '0'};
  padding: ${({ isDesktop, isTablet }) =>
    isDesktop ? '44px 48px 96px' : isTablet ? '36px 28px 72px' : '28px 20px 64px'};
  max-width: ${({ isDesktop, isTablet }) =>
    isDesktop || isTablet ? `min(1040px, calc(100vw - ${SIDER_RAIL}px - 56px))` : '100%'};
  background: ${({ theme }) => theme.canvasGradient};
  overflow-x: hidden;
`;

const BackdropGrid = styled.div`
  pointer-events: none;
  position: fixed;
  inset: 0;
  left: ${SIDER_RAIL}px;
  z-index: 0;
  opacity: 0.4;
  background-image:
    linear-gradient(${({ theme }) => theme.siderBorder} 1px, transparent 1px),
    linear-gradient(90deg, ${({ theme }) => theme.siderBorder} 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 75% 65% at 50% 0%, black 20%, transparent 72%);

  @media (max-width: 919px) {
    left: 0;
    mask-image: radial-gradient(ellipse 85% 55% at 50% 0%, black 15%, transparent 70%);
  }
`;

const PageHeader = styled.header`
  position: relative;
  z-index: 1;
  margin-bottom: 40px;
  padding-bottom: 36px;

  h1 {
    margin: 8px 0 14px;
    font-size: clamp(1.75rem, 3vw, 2.25rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    color: ${({ theme }) => theme.text};
  }
`;

const HeaderTop = styled.div`
  margin-bottom: 20px;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px 8px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-decoration: none;
  color: ${({ theme }) => theme.textMuted};
  border: 1px solid ${({ theme }) => theme.siderBorder};
  background: ${({ theme }) => theme.cardColor};
  backdrop-filter: blur(10px);
  box-shadow: ${({ theme }) => theme.shadowCard};
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;

  .ico {
    font-size: 9px;
    opacity: 0.65;
  }

  .cur {
    color: ${({ theme }) => theme.text};
  }

  &:hover {
    color: ${({ theme }) => theme.text};
    border-color: ${({ theme }) => theme.accentMuted};
    box-shadow: ${({ theme }) => theme.shadowElevated};
    transform: translateY(-1px);
  }
`;

const HeaderAccent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: min(200px, 42%);
  height: 3px;
  border-radius: 999px;
  background: ${({ theme }) => theme.progressGradient};
  box-shadow: 0 0 20px ${({ theme }) => theme.accentMuted};
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

const Surface = styled.section<{ $tall?: boolean }>`
  position: relative;
  margin-bottom: ${({ $tall }) => ($tall ? 28 : 22)}px;
  padding: ${({ $tall }) => ($tall ? '26px 26px 28px' : '22px 24px 24px')};
  border-radius: 22px;
  border: 1px solid ${({ theme }) => theme.cardBorder};
  background: ${({ theme }) => theme.cardColor};
  color: ${({ theme }) => theme.cardText};
  backdrop-filter: blur(18px);
  box-shadow: ${({ theme }) => theme.shadowCard};
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 22px;
    right: 22px;
    height: 2px;
    border-radius: 0 0 4px 4px;
    background: ${({ theme }) => theme.progressGradient};
    opacity: 0.45;
    pointer-events: none;
  }

  &:hover {
    border-color: ${({ theme }) => theme.chipBorder};
    box-shadow: ${({ theme }) => theme.shadowElevated};
  }
`;

const SectionTitle = styled.h2`
  margin: 0 0 18px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.cardTextMuted};
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
  gap: 22px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const CardInset = styled.div`
  margin-top: 4px;
  padding: 18px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.siderBorder};
  background: ${({ theme }) => theme.siderArrowColor};
`;

const GalleryInset = styled.div`
  margin-top: 4px;
  min-height: 400px;
  padding: 22px;
  border-radius: 18px;
  border: 1px solid ${({ theme }) => theme.siderBorder};
  background: ${({ theme }) => theme.siderArrowColor};
`;
