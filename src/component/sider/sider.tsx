import { useContext, useState } from "react";
import styled from "styled-components";

import {
  FaHeartbeat,
  FaEnvelope,
  FaPhoneAlt,
  FaFeather,
  FaReact,
  FaGraduationCap,
  FaGrinBeam,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiSass,
  SiStyledcomponents,
  SiAntdesign,
  // SiCss3,
  // SiHtml5,
  SiApollographql,
  SiSocketdotio,
  SiAxios,
  SiMui,
  SiReactquery,
  SiRecoil,
  SiStorybook,
  SiFlutter,
} from "react-icons/si";
import { LuMessagesSquare, LuBookOpenCheck } from "react-icons/lu";
import { TbBrandRedux, TbBrandReactNative } from "react-icons/tb";
import { MdOutlineLightMode, MdOutlineNightlightRound } from "react-icons/md";
import { GrRun } from "react-icons/gr";

import profileImage from "../../assets/image/profile.png";
import useResponsive from "../../hooks/useResponsive";
import { ThemeContext } from "../../contexts/ThemeContext";

const Sider = () => {
  const { isDesktop, isTablet } = useResponsive();
  const [stackVisible, setStackVisible] = useState(true);
  const [experienceVisible, setExperienceVisible] = useState(true);

  const techArr = [
    { name: "React", icon: <FaReact /> },
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "Typescript", icon: <SiTypescript /> },
    { name: "Sass", icon: <SiSass /> },
    { name: "Styledcomponent", icon: <SiStyledcomponents /> },
    { name: "AntDesign", icon: <SiAntdesign /> },
    { name: "Apollographql", icon: <SiApollographql /> },
    { name: "Socket.io", icon: <SiSocketdotio /> },
    { name: "Axios", icon: <SiAxios /> },
    { name: "Mui", icon: <SiMui /> },
    { name: "ReactQuery", icon: <SiReactquery /> },
    { name: "Recoil", icon: <SiRecoil /> },
    // { name: "Css3", icon: <SiCss3 /> },
    // { name: "Html5", icon: <SiHtml5 /> },
  ];

  const experienceTechArr = [
    { name: "ReduxToolkit", icon: <TbBrandRedux /> },
    { name: "StoryBook", icon: <SiStorybook /> },
    { name: "ReactNative", icon: <TbBrandReactNative /> },
    { name: "Flutter", icon: <SiFlutter /> },
  ];

  const { toggleTheme, isDarkMode } = useContext(ThemeContext);

  const handleCopy = () => {
    navigator.clipboard.writeText("cowhddnjsdl0@naver.com").then(() => {
      alert("이메일 주소가 복사되었습니다.");
    });
  };

  const handlePhoneCall = () => {
    window.location.href = `tel:${"010-5705-4865"}`;
  };

  return (
    <Container isBig={isDesktop || isTablet}>
      <LightModeButtonWrapper onClick={toggleTheme}>
        {isDarkMode ? (
          <MdOutlineLightMode />
        ) : (
          <MdOutlineNightlightRound style={{ rotate: "-30deg" }} />
        )}
      </LightModeButtonWrapper>
      <TopWrapper>
        <PictureWrapper>
          <img src={profileImage} alt="profile" />
        </PictureWrapper>
        <NameWrapper>
          <div>채종원</div>
          <div>Frontend Developer</div>
        </NameWrapper>
      </TopWrapper>
      <InfoWrapper>
        <div>
          <FaHeartbeat />
          <div>1994.03.30 / 서울 성북구 돈암2동</div>
        </div>
        <HoverInfo onClick={handleCopy}>
          <FaEnvelope />
          <div>cowhddnjsdl0@naver.com</div>
        </HoverInfo>
        <HoverInfo onClick={handlePhoneCall}>
          <FaPhoneAlt />
          <div>010-5705-4865</div>
        </HoverInfo>
      </InfoWrapper>
      <Line />
      <MeritIconWrapper>
        <div>
          <MeritIconItem>
            <LuMessagesSquare />
          </MeritIconItem>
          <div>의사소통</div>
        </div>
        <div>
          <MeritIconItem>
            <FaGrinBeam />
          </MeritIconItem>
          <div>차분함</div>
        </div>
        <div>
          <MeritIconItem>
            <GrRun />
          </MeritIconItem>
          <div>도전정신</div>
        </div>
        <div>
          <MeritIconItem>
            <LuBookOpenCheck />
          </MeritIconItem>
          <div>꼼꼼함</div>
        </div>
      </MeritIconWrapper>
      <Line />
      <TitleStyle
        onClick={() => setStackVisible((prev) => !prev)}
        visible={stackVisible}
      >
        <FaFeather size={25} />
        <div>Tech Stack</div>
        <div>{">"}</div>
      </TitleStyle>
      <TechWrapper visible={stackVisible}>
        {techArr.map((v) => (
          <TechStyle key={v.name}>
            <div>{v.icon}</div>
            <div>{v.name}</div>
          </TechStyle>
        ))}
      </TechWrapper>
      <Line />
      <TitleStyle
        onClick={() => setExperienceVisible((prev) => !prev)}
        visible={experienceVisible}
      >
        <FaFeather size={25} />
        <div>Experience Tech</div>
        <div>{">"}</div>
      </TitleStyle>
      <TechWrapper visible={experienceVisible}>
        {experienceTechArr.map((v) => (
          <TechStyle>
            <div>{v.icon}</div>
            <div>{v.name}</div>
          </TechStyle>
        ))}
      </TechWrapper>
      <Line />
      <TitleStyle unActiveHover>
        <FaGraduationCap size={25} />
        <div>Education</div>
        <div />
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
  transition: all 0.1s linear;
  width: ${({ isBig }) => (isBig ? "300px" : "auto")};
  background-color: ${({ theme }) => theme.siderBackGround};
  height: 100%;
  position: ${({ isBig }) => (!isBig ? "reletive" : "fixed")};
  padding: 10px;
  overflow: scroll;
  z-index: 2;
  margin-top: ${({ isBig }) => (isBig ? 0 : "250px")};
`;

const TopWrapper = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PictureWrapper = styled.div`
  border-radius: 100%;
  width: 170px;
  height: 170px;
  img {
    border-radius: 100%;
    width: 100%;
    height: 100%;
  }
`;

const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 600;
  & :first-child {
    font-size: 20px;
    font-weight: 700;
  }
`;

const InfoWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
    gap: 7px;
    cursor: pointer;
    padding: 4px 15px;
    border-radius: 7px;
  }
  > :first-child {
    cursor: default;
  }
`;

const HoverInfo = styled.div`
  &:hover {
    background-color: ${({ theme }) => theme.siderArrowColor};
  }
`;

const Line = styled.div`
  width: 100%;
  margin: 13px 0;
  height: 1px;
  background-color: #333;
`;

const TitleStyle = styled.div<{ visible?: boolean; unActiveHover?: boolean }>`
  display: flex;
  font-weight: bold;
  gap: 6px;
  align-items: center;
  padding: 5px;
  border-radius: 8px;
  & > :last-child {
    margin: 0 0 auto auto;
    rotate: ${({ visible }) => (visible ? "90deg" : "180deg")};
    font-size: 18px;
    transition: all 0.1s linear;
  }
  cursor: ${({ unActiveHover }) => (unActiveHover ? "default" : "pointer")};
  &:hover {
    background-color: ${({ theme, unActiveHover }) =>
      !unActiveHover ? theme.siderArrowColor : ""};
  }
`;

const TechWrapper = styled.div<{ visible: boolean }>`
  padding: ${({ visible }) => (visible ? "10px 15px" : "0")};
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-height: ${({ visible }) => (visible ? "500px" : "0")};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: all 0.1s ease;
  overflow: hidden;
  opacity: 0.8;
`;

const TechStyle = styled.div`
  display: flex;
  gap: 6px;
`;

const EducationWrapper = styled.div`
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  & > div {
    :first-child {
      font-weight: 500;
    }
    :nth-child(2) {
      font-size: 14px;
    }
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  margin-bottom: 10px;
`;

const MeritIconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  text-align: center;
  & > div {
    :nth-child(2) {
      margin-top: 5px;
    }
  }
`;

const MeritIconItem = styled.div`
  border: solid 1px #333;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  margin: 0 auto;
`;

const LightModeButtonWrapper = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 25px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 2;
`;
