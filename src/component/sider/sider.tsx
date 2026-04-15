import { useContext, useState } from 'react';
import styled, { css } from 'styled-components';

import {
  FaHeartbeat,
  FaEnvelope,
  FaPhoneAlt,
  FaFeather,
  FaReact,
  FaGraduationCap,
  FaGrinBeam,
  FaAws,
  FaGithub,
  FaSourcetree,
  FaFigma,
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTypescript,
  SiSass,
  SiStyledcomponents,
  SiAntdesign,
  SiApollographql,
  SiSocketdotio,
  SiAxios,
  SiMui,
  SiReactquery,
  SiRecoil,
  SiStorybook,
  SiFlutter,
  SiVercel,
  SiAmazons3,
  SiXcode,
  SiAndroidstudio,
  SiVisualstudio,
  SiAdobexd,
} from 'react-icons/si';
import { LuMessagesSquare, LuBookOpenCheck } from 'react-icons/lu';
import { TbBrandRedux, TbBrandReactNative } from 'react-icons/tb';
import { MdOutlineLightMode, MdOutlineNightlightRound } from 'react-icons/md';
import { GrRun } from 'react-icons/gr';

import profileImage from '../../assets/image/profile.png';
import useResponsive from '../../hooks/useResponsive';
import { ThemeContext } from '../../contexts/ThemeContext';

const Sider = () => {
  const { isDesktop, isTablet } = useResponsive();
  const [stackVisible, setStackVisible] = useState(true);
  const [experienceVisible, setExperienceVisible] = useState(true);

  const techArr = [
    { name: 'React', icon: <FaReact /> },
    { name: 'Next.js', icon: <SiNextdotjs /> },
    { name: 'Typescript', icon: <SiTypescript /> },
    { name: 'Recoil', icon: <SiRecoil /> },
    { name: 'Styledcomponent', icon: <SiStyledcomponents /> },
    { name: 'Sass', icon: <SiSass /> },
    { name: 'AntDesign', icon: <SiAntdesign /> },
    { name: 'Mui', icon: <SiMui /> },
    { name: 'ReactQuery', icon: <SiReactquery /> },
    { name: 'Apollographql', icon: <SiApollographql /> },
    { name: 'Socket.io', icon: <SiSocketdotio /> },
    { name: 'Axios', icon: <SiAxios /> },
    { name: 'VisualStudio', icon: <SiVisualstudio /> },
    { name: 'Github', icon: <FaGithub /> },
    { name: 'Sourcetree', icon: <FaSourcetree /> },
    { name: 'Figma', icon: <FaFigma /> },
    { name: 'AdobeXD', icon: <SiAdobexd /> },
  ];

  const experienceTechArr = [
    { name: 'AmazonAws', icon: <FaAws /> },
    { name: 'Vercel', icon: <SiVercel /> },
    { name: 'AmazonS3', icon: <SiAmazons3 /> },
    { name: 'ReactNative', icon: <TbBrandReactNative /> },
    { name: 'Flutter', icon: <SiFlutter /> },
    { name: 'XCode', icon: <SiXcode /> },
    { name: 'Android Studio', icon: <SiAndroidstudio /> },
    { name: 'ReduxToolkit', icon: <TbBrandRedux /> },
    { name: 'StoryBook', icon: <SiStorybook /> },
  ];

  const { toggleTheme, isDarkMode } = useContext(ThemeContext);

  const handleCopy = () => {
    navigator.clipboard.writeText('cowhddnjsdl0@naver.com').then(() => {
      alert('이메일 주소가 복사되었습니다.');
    });
  };

  const handlePhoneCall = () => {
    window.location.href = 'tel:010-5705-4865';
  };

  return (
    <Container isBig={isDesktop || isTablet} data-sider="true">
      <ThemeToggle
        type="button"
        aria-label={isDarkMode ? '라이트 모드' : '다크 모드'}
        onClick={toggleTheme}
      >
        {isDarkMode ? (
          <MdOutlineLightMode />
        ) : (
          <MdOutlineNightlightRound style={{ rotate: '-30deg' }} />
        )}
      </ThemeToggle>
      <TopWrapper>
        <PictureWrapper>
          <img src={profileImage} alt="프로필" />
        </PictureWrapper>
        <NameWrapper>
          <div className="name">채종원</div>
          <div className="role">Frontend Developer</div>
        </NameWrapper>
      </TopWrapper>
      <InfoWrapper>
        <div className="row static">
          <FaHeartbeat aria-hidden />
          <div>1994.03.30 / 서울 성북구 돈암2동</div>
        </div>
        <HoverInfo type="button" onClick={handleCopy}>
          <FaEnvelope aria-hidden />
          <div>cowhddnjsdl0@naver.com</div>
        </HoverInfo>
        <HoverInfo type="button" onClick={handlePhoneCall}>
          <FaPhoneAlt aria-hidden />
          <div>010-5705-4865</div>
        </HoverInfo>
      </InfoWrapper>
      <Line />
      <MeritIconWrapper>
        <div>
          <MeritIconItem>
            <LuMessagesSquare aria-hidden />
          </MeritIconItem>
          <div>의사소통</div>
        </div>
        <div>
          <MeritIconItem>
            <FaGrinBeam aria-hidden />
          </MeritIconItem>
          <div>차분함</div>
        </div>
        <div>
          <MeritIconItem>
            <GrRun aria-hidden />
          </MeritIconItem>
          <div>도전정신</div>
        </div>
        <div>
          <MeritIconItem>
            <LuBookOpenCheck aria-hidden />
          </MeritIconItem>
          <div>꼼꼼함</div>
        </div>
      </MeritIconWrapper>
      <Line />
      <TitleStyle
        type="button"
        onClick={() => setStackVisible((prev) => !prev)}
        visible={stackVisible}
      >
        <FaFeather size={22} aria-hidden />
        <div>Tech Stack</div>
        <Chevron aria-hidden visible={stackVisible}>
          ›
        </Chevron>
      </TitleStyle>
      <TechWrapper visible={stackVisible}>
        {techArr.map((v) => (
          <TechStyle key={v.name}>
            <span className="ico">{v.icon}</span>
            <span className="lbl">{v.name}</span>
          </TechStyle>
        ))}
      </TechWrapper>
      <Line />
      <TitleStyle
        type="button"
        onClick={() => setExperienceVisible((prev) => !prev)}
        visible={experienceVisible}
      >
        <FaFeather size={22} aria-hidden />
        <div>Experience Tech</div>
        <Chevron aria-hidden visible={experienceVisible}>
          ›
        </Chevron>
      </TitleStyle>
      <TechWrapper visible={experienceVisible}>
        {experienceTechArr.map((v) => (
          <TechStyle key={v.name}>
            <span className="ico">{v.icon}</span>
            <span className="lbl">{v.name}</span>
          </TechStyle>
        ))}
      </TechWrapper>
      <Line />
      <TitleStyle as="div" unActiveHover>
        <FaGraduationCap size={22} aria-hidden />
        <div>Education</div>
        <span />
      </TitleStyle>
      <EducationWrapper>
        <div>
          <div>홍익사범대학부속고등학교</div>
          <div>2010.03 ~ 2013.02</div>
        </div>
        <div>
          <div>한국방송통신대학교</div>
          <div>2022.03 ~ 재학중(컴퓨터과학과)</div>
        </div>
      </EducationWrapper>
    </Container>
  );
};

export default Sider;

const Container = styled.div<{ isBig: boolean }>`
  transition: background 0.25s ease;
  width: ${({ isBig }) => (isBig ? '300px' : 'auto')};
  background: ${({ theme }) => theme.siderBackGround};
  border-right: ${({ isBig, theme }) =>
    isBig ? `1px solid ${theme.siderBorder}` : 'none'};
  backdrop-filter: blur(16px);
  padding: 16px 12px 24px;
  z-index: 12;

  ${({ isBig }) =>
    isBig
      ? css`
          position: fixed;
          top: 0;
          left: 0;
          /* 뷰포트 높이에 맞춰 고정 → 넘치는 콘텐츠는 이 영역 안에서 스크롤 */
          height: 100vh;
          max-height: 100dvh;
          overflow-y: auto;
          overflow-x: hidden;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
        `
      : css`
          position: relative;
          min-height: auto;
          overflow-x: hidden;
        `}
`;

const ThemeToggle = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.siderBorder};
  background: ${({ theme }) => theme.siderArrowColor};
  color: ${({ theme }) => theme.text};
  font-size: 20px;
  cursor: pointer;
  z-index: 2;
  padding: 0;
  transition:
    background 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.accentMuted};
  }

  &:active {
    transform: scale(0.96);
  }
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding-top: 8px;
`;

const PictureWrapper = styled.div`
  padding: 4px;
  border-radius: 100%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.accent},
    ${({ theme }) => theme.accentMuted}
  );
  box-shadow: 0 8px 28px ${({ theme }) => theme.accentMuted};

  img {
    display: block;
    border-radius: 100%;
    width: 156px;
    height: 156px;
    object-fit: cover;
    border: 3px solid ${({ theme }) => theme.siderBackGround};
  }
`;

const NameWrapper = styled.div`
  text-align: center;

  .name {
    font-size: 1.35rem;
    font-weight: 800;
    letter-spacing: -0.04em;
    color: ${({ theme }) => theme.text};
  }

  .role {
    margin-top: 4px;
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.textMuted};
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
`;

const InfoWrapper = styled.div`
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  .row {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    padding: 8px 12px;
    border-radius: 10px;
    font-size: 13px;
    line-height: 1.45;
    color: ${({ theme }) => theme.text};

    &.static {
      cursor: default;
      color: ${({ theme }) => theme.textMuted};
    }

    svg {
      flex-shrink: 0;
      margin-top: 2px;
      opacity: 0.85;
      color: ${({ theme }) => theme.accent};
    }
  }
`;

const HoverInfo = styled.button`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  width: 100%;
  margin: 0;
  padding: 8px 12px;
  border: none;
  border-radius: 10px;
  background: transparent;
  font: inherit;
  text-align: left;
  color: ${({ theme }) => theme.text};
  font-size: 13px;
  line-height: 1.45;
  cursor: pointer;
  transition: background 0.15s ease;

  svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: ${({ theme }) => theme.accent};
  }

  &:hover {
    background: ${({ theme }) => theme.siderArrowColor};
  }
`;

const Line = styled.div`
  width: 100%;
  margin: 16px 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    ${({ theme }) => theme.siderBorder},
    transparent
  );
`;

const Chevron = styled.span<{ visible?: boolean }>`
  margin-left: auto;
  font-size: 18px;
  font-weight: 300;
  line-height: 1;
  transform: rotate(${({ visible }) => (visible ? '90deg' : '0deg')});
  transition: transform 0.2s ease;
  color: ${({ theme }) => theme.textMuted};
`;

const TitleStyle = styled.button<{ visible?: boolean; unActiveHover?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin: 0;
  padding: 10px 12px;
  border: none;
  border-radius: 12px;
  background: transparent;
  font: inherit;
  font-weight: 700;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  text-align: left;
  cursor: ${({ unActiveHover }) => (unActiveHover ? 'default' : 'pointer')};
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme, unActiveHover }) =>
      unActiveHover ? 'transparent' : theme.siderArrowColor};
  }

  svg {
    color: ${({ theme }) => theme.accent};
    flex-shrink: 0;
  }
`;

const TechWrapper = styled.div<{ visible: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: ${({ visible }) => (visible ? '520px' : '0')};
  padding: ${({ visible }) => (visible ? '8px 4px 12px 8px' : '0')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  overflow: hidden;
  transition:
    max-height 0.28s ease,
    opacity 0.22s ease,
    padding 0.22s ease;
`;

const TechStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 10px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  transition: background 0.15s ease;

  .ico {
    display: flex;
    font-size: 17px;
    opacity: 0.92;
    color: ${({ theme }) => theme.accent};
  }

  .lbl {
    letter-spacing: -0.02em;
  }

  &:hover {
    background: ${({ theme }) => theme.siderArrowColor};
  }
`;

const EducationWrapper = styled.div`
  padding: 8px 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 14px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-bottom: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.siderBorder};

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    :first-child {
      font-weight: 600;
      font-size: 14px;
      color: ${({ theme }) => theme.text};
    }

    :nth-child(2) {
      font-size: 12px;
      color: ${({ theme }) => theme.textMuted};
    }
  }
`;

const MeritIconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 4px 8px 8px;
  text-align: center;
  gap: 8px;

  > div {
    flex: 1;
    min-width: 0;
    font-size: 11px;
    font-weight: 600;
    color: ${({ theme }) => theme.textMuted};
    line-height: 1.3;
  }
`;

const MeritIconItem = styled.div`
  border: 1px solid ${({ theme }) => theme.siderBorder};
  border-radius: 100%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  margin: 0 auto 6px;
  color: ${({ theme }) => theme.accent};
  background: ${({ theme }) => theme.siderArrowColor};
  transition:
    transform 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.accentMuted};
  }
`;
