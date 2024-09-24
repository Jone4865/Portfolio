import styled from "styled-components";
import { motion, useScroll } from "framer-motion";
import keyboardImage from "../../src/assets/image/keyboard.jpg";
import Typical from "react-typical";
import useResponsive from "../hooks/useResponsive";
import { useEffect, useMemo, useRef, useState } from "react";

import arrowImg from "../assets/image/arrow-up.svg";

function PageIndex() {
  const { isDesktop, isTablet, isMobile } = useResponsive();
  const { scrollYProgress } = useScroll();
  const items = [1, 2, 3];

  const targetRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibility, setVisibility] = useState<boolean[]>([]);

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
          "안녕하세요.",
          1000,
          "Developer 채종원의 포트폴리오입니다.",
          1000,
        ]}
      />
    ),
    []
  );

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const newVisibility = [...visibility];

      entries.forEach((entry) => {
        const index = targetRefs.current.indexOf(
          entry.target as HTMLDivElement
        );
        if (index !== -1) {
          newVisibility[index] = entry.isIntersecting;
        }
      });

      // 기존 상태와 비교해서 다를 때만 상태 업데이트
      if (JSON.stringify(newVisibility) !== JSON.stringify(visibility)) {
        setVisibility(newVisibility);
      }
    };

    const observers = targetRefs.current.map((el) => {
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
        const el = targetRefs.current[index];
        if (el) {
          observer.unobserve(el);
        }
      });
    };
  }, [visibility]);

  const [arrowVisible, setArrowVisible] = useState(false);

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
          <img src={arrowImg} />
        </ToTopArrow>
        <PrograssStyle
          isDesktop={isDesktop}
          style={{ scaleX: scrollYProgress }}
        />
        <TypingWrapper isDesktop={isDesktop} isTablet={isTablet}>
          {typicalComponent}
          <img
            src={keyboardImage}
            width={"100%"}
            height={"100%"}
            style={{ opacity: "0.8" }}
          />
        </TypingWrapper>
        <Invitation>
          시작은 주변의 권유로 시작하게 되었습니다.
          <br />
          <span>"처음에는 나의 뜻이 아니었다."</span> 말할 수 있는 이유는,
          <br /> 이제는 제가 원하기 때문입니다.
          <br />
          직접 코드를 짜면서 구상한대로 화면에 그려질 때의 <span>성취감</span>과
          지속적으로 의사소통을 하며 팀원들과 퍼즐 맞추듯이 만들어가는 과정에서
          느껴지는 <span>재미</span>, 또한 제가 구현한 서비스를 사용자가 유용해
          하며 즐거워할 때 오는
          <span>뿌듯함</span>에 제가 개발자인 것이 좋습니다. 프로젝트를
          진행하면서 온전히 몰두하고 즐거워하는 저를 보면서 이제는 진정
          <span>"개발자이고 싶다."</span>
          라고 말할 수 있게 되었습니다.
        </Invitation>
        <div style={{ height: "2000px" }} />

        {items.map((v, idx) => (
          <motion.div
            ref={(el) => (targetRefs.current[idx] = el)}
            initial={{ scale: 0, opacity: 0, rotate: 180 }}
            animate={
              visibility[idx]
                ? { rotate: 360, scale: 1, opacity: 1 }
                : { scale: 0 }
            }
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            style={{
              backgroundColor: "#fff",
              width: "50px",
              height: "50px",
              color: "#333",
              margin: "900px auto",
            }}
          >
            {v}
          </motion.div>
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

const Wrap = styled.div`
  position: relative;
`;

const TypingWrapper = styled.div<{
  isDesktop: boolean;
  isTablet: boolean;
}>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ isDesktop, isTablet }) =>
    isDesktop ? "400px" : isTablet ? "250px" : "200px"};
  & :first-child {
    position: absolute;
    color: #d4cbcb;
    z-index: 3;
    font-size: ${({ isDesktop, isTablet }) =>
      isDesktop ? "3vw" : isTablet ? "3vw" : ""};
  }
`;

const Invitation = styled.div`
  height: 300px;
  width: calc(100% - 40px);
  margin: 10px 20px;
  background-color: ${(props) => props.theme.siderBackGround};
  border-radius: 8px;
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
  color: ${(props) => props.theme.arrowText};
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
