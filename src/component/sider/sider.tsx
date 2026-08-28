import { useContext, useEffect, useState } from 'react';
import { animate, stagger } from 'animejs';
import {
  FaEnvelope,
  FaFeather,
  FaGraduationCap,
  FaGrinBeam,
  FaHeartbeat,
  FaPhoneAlt,
} from 'react-icons/fa';
import { LuBookOpenCheck, LuMessagesSquare } from 'react-icons/lu';
import { MdOutlineLightMode, MdOutlineNightlightRound } from 'react-icons/md';
import { GrRun } from 'react-icons/gr';

import profileImage from 'assets/image/profile.png';
import { profile } from 'data/profile';
import { experienceGroups, techGroups } from 'data/siderTech';
import { ThemeContext } from 'contexts';
import { useResponsive } from 'hooks';

import {
  Chevron,
  Container,
  EducationWrapper,
  HoverInfo,
  InfoWrapper,
  Line,
  MeritIconItem,
  MeritIconWrapper,
  NameWrapper,
  PictureWrapper,
  TechGroup,
  TechGroupLabel,
  TechStyle,
  TechWrapper,
  ThemeToggle,
  TitleStyle,
  TopWrapper,
} from './sider.styles';

const meritIcons = {
  communication: LuMessagesSquare,
  calm: FaGrinBeam,
  challenge: GrRun,
  detail: LuBookOpenCheck,
} as const;

const Sider = () => {
  const { isDesktop, isTablet } = useResponsive();
  const [stackVisible, setStackVisible] = useState(true);
  const [experienceVisible, setExperienceVisible] = useState(false);
  const { toggleTheme, isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    if (!stackVisible) return;
    const items = document.querySelectorAll('[data-tech-item="stack"]');
    if (!items.length) return;
    animate(items, {
      opacity: [0, 1],
      translateX: [-8, 0],
      delay: stagger(28),
      duration: 380,
      ease: 'outQuad',
    });
  }, [stackVisible]);

  useEffect(() => {
    if (!experienceVisible) return;
    const items = document.querySelectorAll('[data-tech-item="experience"]');
    if (!items.length) return;
    animate(items, {
      opacity: [0, 1],
      translateX: [-8, 0],
      delay: stagger(28),
      duration: 380,
      ease: 'outQuad',
    });
  }, [experienceVisible]);

  const handleCopy = () => {
    navigator.clipboard.writeText(profile.email).then(() => {
      alert('이메일 주소가 복사되었습니다.');
    });
  };

  const handlePhoneCall = () => {
    window.location.href = profile.phoneTel;
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
          <div className="name">{profile.name}</div>
          <div className="role">{profile.role}</div>
        </NameWrapper>
      </TopWrapper>
      <InfoWrapper>
        <div className="row static">
          <FaHeartbeat aria-hidden />
          <div>{profile.birthAndAddress}</div>
        </div>
        <HoverInfo type="button" onClick={handleCopy}>
          <FaEnvelope aria-hidden />
          <div>{profile.email}</div>
        </HoverInfo>
        <HoverInfo type="button" onClick={handlePhoneCall}>
          <FaPhoneAlt aria-hidden />
          <div>{profile.phone}</div>
        </HoverInfo>
      </InfoWrapper>
      <Line />
      <MeritIconWrapper>
        {profile.merits.map(({ key, label }) => {
          const Icon = meritIcons[key];
          return (
            <div key={key}>
              <MeritIconItem>
                <Icon aria-hidden />
              </MeritIconItem>
              <div>{label}</div>
            </div>
          );
        })}
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
        {techGroups.map((group) => (
          <TechGroup key={group.label}>
            <TechGroupLabel>{group.label}</TechGroupLabel>
            {group.items.map((v) => (
              <TechStyle key={v.name} data-tech-item="stack">
                <span className="ico">{v.icon}</span>
                <span className="lbl">{v.name}</span>
              </TechStyle>
            ))}
          </TechGroup>
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
        {experienceGroups.map((group) => (
          <TechGroup key={group.label}>
            <TechGroupLabel>{group.label}</TechGroupLabel>
            {group.items.map((v) => (
              <TechStyle key={v.name} data-tech-item="experience">
                <span className="ico">{v.icon}</span>
                <span className="lbl">{v.name}</span>
              </TechStyle>
            ))}
          </TechGroup>
        ))}
      </TechWrapper>
      <Line />
      <TitleStyle as="div" unActiveHover>
        <FaGraduationCap size={22} aria-hidden />
        <div>Education</div>
        <span />
      </TitleStyle>
      <EducationWrapper>
        {profile.education.map((item) => (
          <div key={item.school}>
            <div>{item.school}</div>
            <div>{item.period}</div>
          </div>
        ))}
      </EducationWrapper>
    </Container>
  );
};

export default Sider;
