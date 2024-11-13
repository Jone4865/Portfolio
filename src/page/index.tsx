import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import styled, { css } from "styled-components";
import Typical from "react-typical";

//icon들
import { FaAmazon, FaArrowUp, FaAws, FaReact } from "react-icons/fa";
import {
  SiAntdesign,
  SiApollographql,
  SiAxios,
  SiNextdotjs,
  SiReactquery,
  SiRecoil,
  SiSass,
  SiSocketdotio,
  SiStorybook,
  SiStyledcomponents,
  SiTypescript,
} from "react-icons/si";
import { TbBrandRedux } from "react-icons/tb";

import backgroundImage from "../../src/assets/image/background.jpg";

import useResponsive from "../hooks/useResponsive";

type Data = {
  key: string;
  date: string;
  title: string;
  subTitle: string;
  stack: { name: string; icon: ReactNode }[];
  people: string;
  experience: string[];
  link?: { url: string; name: string }[];
};

function PageIndex() {
  const { isDesktop, isTablet, isMobile } = useResponsive();
  const { scrollYProgress } = useScroll();

  const targetRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibility, setVisibility] = useState<boolean[]>([]);
  const [arrowVisible, setArrowVisible] = useState(false);

  const [project] = useState<Data[]>([
    {
      key: "Boundary",
      date: "2023.10 - 2024.10",
      experience: [
        "reactjs를 활용한 csr 페이지 구현",
        "mui, antd, styled-components를 활용한 UI 구현",
        "react query를 활용한 api 요청 연동",
        "react pdf를 통한 pdf 구현",
        "i18next와 구글스프레드 시트 연동을 통한 key에 의존한 번역",
        "recoil을 활용한 전역상태관리",
      ],
      people: "기획&디자인 2, 프론트엔드 5, 백엔드 6",
      stack: [
        { name: "React.js", icon: <FaReact /> },
        { name: "TypeScript", icon: <SiTypescript /> },
        { name: "Ant Design", icon: <SiAntdesign /> },
        { name: "React Query", icon: <SiReactquery /> },
        { name: "Recoil", icon: <SiRecoil /> },
        { name: "styled-coponents", icon: <SiStyledcomponents /> },
      ],
      subTitle: "제약 회사 내부 교육 및 증상, 약물 관리 내부 프로젝트 구현",
      title: "Dream Trial",
    },
    {
      key: "Lawdians",
      date: "2023.05 - 2023.09",
      experience: [
        "nextjs 서버와 nodemailer, axios를 활용한 api 요청 및 응답, 메일 발송",
        "nextjs 서버와 cheerio를 활용한 크롤링",
        "react-js-pagination를 활용한 페이지네이션",
        "scss mixin을 활용한 반응형 뷰 구현",
        "react-slick을 활용한 캐러셀 구현",
        "apollo-client, graphql을 활용한 api 요청",
        "apollo-client, graphql-ws를 활용한 실시간 채팅기능 구현",
        "nextjs를 활용한 ssr 페이지 구현",
      ],
      people: "기획 1, 디자인 1, 프론트엔드 3, 백엔드 1",
      stack: [
        { name: "Next.js", icon: <SiNextdotjs /> },
        { name: "TypeScript", icon: <SiTypescript /> },
        { name: "Sass", icon: <SiSass /> },
        { name: "Apollographql", icon: <SiApollographql /> },
        { name: "axios", icon: <SiAxios /> },
      ],
      subTitle: "상품권 판매, IT 서비스 대행 사이트 구현",
      title: "방배사",
      link: [
        {
          name: "저장소 링크",
          url: "https://github.com/Jone4865/law_bangbaesa",
        },
      ],
    },
    {
      key: "Lawdians",
      date: "2023.07 - 2023.08",
      experience: [
        "apollo-client, graphql을 활용한 api 요청",
        "styled-components, react-responsive를 활용한 반응형 뷰 구현",
        "antd의 UI 컴포넌트를 활용한 사용자 인터페이스 설계 및 개발",
        "react를 활용한 csr 페이지 구현",
      ],
      people: "기획 1, 프론트엔드 1, 백엔드 1",
      stack: [
        { name: "React.js", icon: <FaReact /> },
        { name: "TypeScript", icon: <SiTypescript /> },
        { name: "Ant Design", icon: <SiAntdesign /> },
        { name: "Apollographql", icon: <SiApollographql /> },
        { name: "styled-components", icon: <SiStyledcomponents /> },
      ],
      subTitle: "방배사 프로젝트 관리자 홈페이지 구현",
      title: "방배사 CMS",
      link: [
        {
          name: "저장소 링크",
          url: "https://github.com/Jone4865/law_cms_bangbaesa",
        },
      ],
    },
    {
      key: "Lawdians",
      date: "2023.04 - 2023.05",
      experience: [
        "apollo-client, graphql을 활용한 api 요청",
        "styled-components, react-responsive를 활용한 반응형 뷰 구현",
        "antd의 UI 컴포넌트를 활용한 사용자 인터페이스 설계 및 개발",
        "react를 활용한 csr 페이지 구현",
      ],
      people: "기획 1, 프론트엔드 2, 백엔드 1",
      stack: [
        { name: "React.js", icon: <FaReact /> },
        { name: "TypeScript", icon: <SiTypescript /> },
        { name: "Ant Design", icon: <SiAntdesign /> },
        { name: "Apollographql", icon: <SiApollographql /> },
        { name: "styled-components", icon: <SiStyledcomponents /> },
      ],
      subTitle: "자사 쇼핑몰 CMS 개발 대비 템플릿 구현",
      title: "자사 쇼핑몰 CMS 템플릿",
      link: [
        {
          name: "저장소 링크",
          url: "https://github.com/Jone4865/law_cms_shopSolution",
        },
      ],
    },
    {
      key: "Lawdians",
      date: "2023.02 - 2023.03",
      experience: [
        "apollo-client, graphql을 활용한 api 요청",
        "styled-components, react-responsive를 활용한 반응형 뷰 구현",
        "antd의 UI 컴포넌트를 활용한 사용자 인터페이스 설계 및 개발",
        "react를 활용한 csr 페이지 구현",
      ],
      people: "기획 1, 프론트엔드 2, 백엔드 1",
      stack: [
        { name: "React.js", icon: <FaReact /> },
        { name: "TypeScript", icon: <SiTypescript /> },
        { name: "Ant Design", icon: <SiAntdesign /> },
        { name: "Apollographql", icon: <SiApollographql /> },
        { name: "styled-components", icon: <SiStyledcomponents /> },
      ],
      subTitle: "리얼파이 프로젝트 관리자 홈페이지 구현",
      title: "리얼파이 CMS",
      link: [
        {
          name: "저장소 링크",
          url: "https://github.com/Jone4865/law_cms_realfi",
        },
      ],
    },
    {
      key: "Lawdians",
      date: "2023.01 - 2023.02",
      experience: [
        "nextjs를 활용한 ssr 페이지 구현",
        "scss mixin을 활용한 반응형 뷰 구현",
        "nextjs 서버와 nodemailer, axios를 활용한 api 요청 및 응답, 메일 발송",
        "kakaomap api를 활용한 지도 컴포넌트 구현",
      ],
      people: "기획 1, 디자인 1, 프론트엔드 1",
      stack: [
        { name: "Next.js", icon: <SiNextdotjs /> },
        { name: "TypeScript", icon: <SiTypescript /> },
        { name: "Sass", icon: <SiSass /> },
        { name: "axios", icon: <SiAxios /> },
      ],
      subTitle: "기업 홈페이지 구현",
      title: "로디언즈 홀딩스",
      link: [
        {
          name: "저장소 링크",
          url: "https://github.com/Jone4865/law_lawdiansHoldings",
        },
        {
          name: "관련영상 링크",
          url: "https://drive.google.com/file/d/12jmJR7EIZw0DbMfhUEqaU9RaIU8XM2w0/view?usp=drive_link",
        },
      ],
    },
    {
      key: "Lawdians",
      date: "2023.01 - 2023.01",
      experience: [
        "nextjs를 활용한 ssr 페이지 구현",
        "scss를 활용한 퍼블리싱",
        "react-responsive를 활용한 반응형 뷰 구현",
        "storybook을 활용한 컴포넌트 시각적 정리 및 문서화",
      ],
      people: "기획 1, 디자인 1, 프론트엔드 1",
      stack: [
        { name: "Next.js", icon: <SiNextdotjs /> },
        { name: "TypeScript", icon: <SiTypescript /> },
        { name: "Sass", icon: <SiSass /> },
        { name: "StoryBook", icon: <SiStorybook /> },
      ],
      subTitle: "조각거래 플랫폼 랜딩페이지 구현",
      title: "리얼파이 랜딩페이지",
      link: [
        {
          name: "저장소 링크",
          url: "https://github.com/Jone4865/law_landing_realfi",
        },
        {
          name: "관련영상 링크",
          url: "https://drive.google.com/file/d/1-C0ixxMNVXRO6CDO9l-dtJPNETvxTWqG/view?usp=drive_link",
        },
      ],
    },
    {
      key: "Lawdians",
      date: "2023.01 - 2023.01",
      experience: [
        "nextjs를 활용한 ssr 페이지 구현",
        "scss mixin을 활용한 반응형 뷰 구현",
        "nextjs 서버와 nodemailer, axios를 활용한 api 요청 및 응답, 메일 발송",
        "storybook을 활용한 컴포넌트 시각적 정리 및 문서화",
      ],
      people: "기획 1, 디자인 1, 프론트엔드 1",
      stack: [
        { name: "Next.js", icon: <SiNextdotjs /> },
        { name: "TypeScript", icon: <SiTypescript /> },
        { name: "Sass", icon: <SiSass /> },
        { name: "StoryBook", icon: <SiStorybook /> },
        { name: "axios", icon: <SiAxios /> },
      ],
      subTitle: "마케팅 운용 및 운영 대행 사이트 랜딩페이지 구현",
      title: "감동기획 랜딩페이지",
      link: [
        {
          name: "저장소 링크",
          url: "https://github.com/Jone4865/law_landing_gamdongplan",
        },
        {
          name: "관련영상 링크",
          url: "https://drive.google.com/file/d/1PvmixTpkjmTdYCh2hcXi-TlG_pLokSN7/view?usp=drive_link",
        },
      ],
    },
    {
      key: "Lawdians",
      date: "2023.01 - 2023.01",
      experience: [
        "nextjs를 활용한 ssr 페이지 구현",
        "scss mixin을 활용한 반응형 뷰 구현",
        "nextjs 서버와 nodemailer, axios를 활용한 api 요청 및 응답, 메일 발송",
        "storybook을 활용한 컴포넌트 시각적 정리 및 문서화",
        "nextjs 서버와 cheerio를 활용한 크롤링",
      ],
      people: "기획 1, 디자인 1, 프론트엔드 1",
      stack: [
        { name: "Next.js", icon: <SiNextdotjs /> },
        { name: "TypeScript", icon: <SiTypescript /> },
        { name: "Sass", icon: <SiSass /> },
        { name: "StoryBook", icon: <SiStorybook /> },
        { name: "axios", icon: <SiAxios /> },
      ],
      subTitle: "상품권 판매, IT 서비스 대행 사이트 랜딩페이지",
      title: "방배사 랜딩페이지",
      link: [
        {
          name: "저장소 링크",
          url: "https://github.com/Jone4865/law_landing_bangbaesa",
        },
        {
          name: "관련영상 링크",
          url: "https://drive.google.com/file/d/1vhBm38_C92M3ov5CCcB_MgwmsGebARqp/view?usp=drive_link",
        },
      ],
    },
    {
      key: "Hanghae99",
      date: "2022.08 - 2022.09",
      experience: [
        "socket.io를 활용한 실시간 채팅 기능 및 실시간 게임 구현",
        "axios를 활용한 api 요청 및 응답",
        "react를 활용한 csr 페이지 구현",
        "kakao-login-api를 활용한 카카오 로그인 기능 구현",
        "redux-toolkit을 활용한 전역상태관리",
        "styled-components를 활용한 퍼블리싱",
        "amazone s3, amazon cloud front, aws certificate manager를 통한 https 자동화 배포",
      ],
      people: "디자인 1, 프론트엔드 2, 백엔드 3",
      stack: [
        { name: "React.js", icon: <FaReact /> },
        { name: "redux-thunk", icon: <TbBrandRedux /> },
        { name: "styled-components", icon: <SiStyledcomponents /> },
        { name: "Socket.IO", icon: <SiSocketdotio /> },
        { name: "Amazon S3", icon: <FaAmazon /> },
        { name: "Amazon CloudFront", icon: <FaAmazon /> },
        { name: "AWS Certificate Manager", icon: <FaAws /> },
        { name: "axios", icon: <SiAxios /> },
      ],
      subTitle: "1:1 턴제 심리 카드게임",
      title: "덜지니어스",
      link: [
        {
          name: "저장소 링크",
          url: "https://github.com/Jone4865/TherGeniusGame",
        },
        {
          name: "관련영상 링크",
          url: "https://www.youtube.com/watch?v=ESSO1rTWOhY",
        },
      ],
    },
    {
      key: "Hanghae99",
      date: "2022.08 - 2022.08",
      experience: [
        "redux-tullkit을 활용한 전역상태 관리",
        "styled-components를 활용한 퍼블리싱",
        "react를 활용한 csr 페이지 구현",
        "amazone s3, amazon cloud front를 활용한 배포",
        "axios를 활용한 api 요청 및 응답",
      ],
      people: "디자인 1, 프론트엔드 2, 백엔드 3",
      stack: [
        { name: "React.js", icon: <FaReact /> },
        { name: "react-redux", icon: <TbBrandRedux /> },
        { name: "styled-components", icon: <SiStyledcomponents /> },
        { name: "axios", icon: <SiAxios /> },
      ],
      subTitle: "웹 스무고개 게임 구현",
      title: "20-Questions",
      link: [
        {
          name: "저장소 링크",
          url: "https://github.com/Jone4865/20questions",
        },
      ],
    },
  ]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const typicalComponent = useMemo(
    () => (
      <Typical
        steps={[
          "안녕하세요. 키보드 위를 서핑하는,",
          1000,
          "Developer 채종원의 포트폴리오입니다.",
          1000,
        ]}
        loop={3}
      />
    ),
    []
  );

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const newVisibility = [...visibility];

      const currentTarget = targetRefs.current;

      entries.forEach((entry) => {
        const index = currentTarget.indexOf(entry.target as HTMLDivElement);
        if (index !== -1) {
          newVisibility[index] = entry.isIntersecting;
        }
      });

      // 기존 상태와 비교해서 다를 때만 상태 업데이트
      if (JSON.stringify(newVisibility) !== JSON.stringify(visibility)) {
        setVisibility(newVisibility);
      }
    };

    const currentTarget = targetRefs.current;

    const observers = currentTarget.map((el) => {
      const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.1,
      });

      if (el) {
        observer.observe(el);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer, index) => {
        const el = currentTarget[index];
        if (el) {
          observer.unobserve(el);
        }
      });
    };
  }, [visibility]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latestProgress) => {
      const scrollPosition =
        latestProgress * document.documentElement.scrollHeight;

      setArrowVisible(scrollPosition > 1000);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <Container isDesktop={isDesktop} isTablet={isTablet}>
      <Wrap>
        <ToTopArrow
          initial={{ opacity: arrowVisible ? 0 : 0.5, scale: 0.5 }}
          animate={{ opacity: arrowVisible ? 0.5 : 0, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          onClick={scrollToTop}
        >
          <FaArrowUp />
        </ToTopArrow>
        <PrograssStyle
          isDesktop={isDesktop}
          style={{ scaleX: scrollYProgress }}
        />
        <TypingWrapper isDesktop={isDesktop} isTablet={isTablet}>
          {typicalComponent}
          <img
            alt="backgroundImage"
            src={backgroundImage}
            width={"100%"}
            height={"100%"}
          />
        </TypingWrapper>
        <motion.div
          initial={{ width: "0" }}
          animate={{ width: "100%" }}
          transition={{ ease: "easeInOut" }}
        >
          <Invitation isDesktop={isDesktop} isTablet={isTablet}>
            <div>
              시작은 주변의 권유로 시작하게 되었습니다.
              <br />
              <span>"처음에는 나의 뜻이 아니었다."</span> 말할 수 있는 이유는,
              이제는 제가 원하기 때문입니다.
              <br />
              <br />
              직접 코드를 짜면서 구상한대로 화면에 그려질 때의{" "}
              <span>성취감</span>
              과<br />
              지속적으로 의사소통 하며 팀원들과 퍼즐 맞추듯이 만들어가는
              과정에서 느껴지는 <span>재미</span>,<br />
              또한 제가 구현한 서비스를 사용자가 유용해 하며 즐거워할 때 오는
              <span>뿌듯함</span>에제가 개발자인 것이 좋습니다.
              <br />
              프로젝트를 진행하면서 온전히 몰두하고 즐거워하는 저를 보면서
              <br />
              이제는 진정
              <span>"개발자이고 싶다."</span>
              라고 말할 수 있게 되었습니다.
            </div>
          </Invitation>
        </motion.div>

        {project.map((v, idx) => (
          <CardWrapper
            key={v.title}
            isDesktop={isDesktop}
            isTablet={isTablet}
            isMobile={isMobile}
            ref={(el) => (targetRefs.current[idx] = el)}
            initial={{
              scale: 0,
              opacity: 0,
              rotate: -20,
            }}
            animate={
              visibility[idx]
                ? { rotate: 0, scale: 1, opacity: 1 }
                : { scale: 0 }
            }
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            whileHover={{ scale: 1.1 }}
          >
            <LineOne isDesktop={isDesktop}>
              <h2>프로젝트명 : {v.title}</h2>
              <h4>기간 : {v.date}</h4>
            </LineOne>
            <div>
              <span>목적</span> : {v.subTitle}
            </div>
            <div>
              <span>인원</span> : {v.people}
            </div>
            <div>
              <span>경험</span>
              <ExperienceWrapper>
                {v.experience.map((item) => (
                  <div key={item}>&nbsp; - {item}</div>
                ))}
              </ExperienceWrapper>
            </div>
            <CardIconWrapper>
              {v.stack.map((item) => (
                <div key={item.name}>
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              ))}
            </CardIconWrapper>
            {v.link?.map((item) => (
              <div key={item.name}>
                <span>{item.name}</span> :{" "}
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.url}
                </a>
              </div>
            ))}
          </CardWrapper>
        ))}
      </Wrap>
    </Container>
  );
}

export default PageIndex;

const Container = styled.div<{ isDesktop: boolean; isTablet: boolean }>`
  margin-left: ${({ isDesktop, isTablet }) =>
    isDesktop || isTablet ? "320px" : "0"};
`;

const Wrap = styled.div``;

const TypingWrapper = styled.div<{
  isDesktop: boolean;
  isTablet: boolean;
}>`
  position: ${({ isDesktop, isTablet }) =>
    isDesktop || isTablet ? "relative" : "absolute"};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ isDesktop, isTablet }) =>
    isDesktop ? "450px" : isTablet ? "350px" : "250px"};
  & :first-child {
    position: absolute;
    color: #d4cbcb;
    z-index: 3;
    font-size: ${({ isDesktop, isTablet }) =>
      isDesktop ? "3vw" : isTablet ? "3vw" : ""};
  }
`;

const Invitation = styled.div<{ isDesktop: boolean; isTablet: boolean }>`
  height: 200px;
  width: calc(100% - 80px);
  margin: 50px 20px;
  background-color: ${(props) => props.theme.siderBackGround};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: ${({ isDesktop, isTablet }) =>
    isDesktop ? "16px" : isTablet ? "12px" : "11px"};
  padding: 0 20px;
`;

const PrograssStyle = styled(motion.div)<{ isDesktop: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 10px;
  background: #ff0055;
  transform-origin: 0%;
  z-index: 3;
  margin-left: ${({ isDesktop }) => (isDesktop ? "320px" : "0")};
`;

const ToTopArrow = styled(motion.div)`
  position: fixed;
  z-index: 3;
  bottom: 20px;
  right: 20px;
  height: 50px;
  width: 50px;
  border-radius: 100%;
  background-color: ${(props) => props.theme.arrowBackGround};
  color: ${(props) => props.theme.background};
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
  cursor: pointer;
  text-align: center;
  & > span {
    margin-top: 5px;
  }
`;

const CardWrapper = styled(motion.div)<{
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}>`
  background-color: ${(props) => props.theme.cardColor};
  color: ${(props) => props.theme.cardText};
  width: 60%;

  margin: 70px auto;
  border-radius: 20px;
  padding: 20px;
  font-size: 14px;

  display: flex;
  flex-direction: column;
  gap: 15px;

  a {
    color: ${(props) => props.theme.cardText};
    word-break: break-all;
    cursor: pointer;
  }

  h2,
  h4,
  span {
    font-weight: bold;
    color: ${(props) => props.theme.cardText};
  }

  h2,
  h4 {
    margin: ${({ isDesktop }) => (isDesktop ? "10px 0" : "5px auto")};
  }

  & > div {
    opacity: 0.8;
  }

  ${({ isMobile }) =>
    isMobile &&
    css`
      h2 {
        font-size: 16px;
      }
      font-size: 12px;

      a {
        font-size: 11px;
      }
    `}
`;

const CardIconWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  border: solid 1px ${(props) => props.theme.cardText};
  border-left: none;
  border-right: none;
  padding: 8px 0 8px 5px;

  div {
    display: flex;
    align-items: center;
    gap: 2px;
    white-space: nowrap;
  }
`;

const ExperienceWrapper = styled.div`
  line-height: 1.3;
  margin-top: 2px;

  div {
    word-break: keep-all;
  }
`;

const LineOne = styled.div<{ isDesktop: boolean }>`
  display: flex;
  flex-direction: ${({ isDesktop }) => (isDesktop ? "row" : "column")};
  justify-content: space-between;
`;
