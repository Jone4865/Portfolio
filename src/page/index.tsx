import { ReactNode, useEffect, useMemo, useState, useCallback } from 'react';
import { motion, useScroll, type Transition } from 'framer-motion';
import styled, { css } from 'styled-components';
import Typical from 'react-typical';

//icon들
import { FaAmazon, FaAws, FaReact, FaChevronDown } from 'react-icons/fa';
import {
  SiAntdesign,
  SiApollographql,
  SiAxios,
  SiNextdotjs,
  SiReacthookform,
  SiReactquery,
  SiRecoil,
  SiSass,
  SiSocketdotio,
  SiStorybook,
  SiStyledcomponents,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import { TbBrandRedux } from 'react-icons/tb';

import backgroundImage from '../../src/assets/image/background.jpg';

import useResponsive from '../hooks/useResponsive';
import HomeHeroCard from './homeHero/HomeHeroCard';

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

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

const sectionTransition: Transition = {
  duration: 0.52,
  ease: easeOutExpo,
};

const cardRevealVariants = {
  off: {
    opacity: 0,
    y: 36,
    scale: 0.96,
    filter: 'blur(5px)',
  },
  on: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      mass: 0.88,
    },
  },
};

const stackParentVariants = {
  off: {},
  on: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.18,
    },
  },
};

const stackChipVariants = {
  off: { opacity: 0, y: 10, scale: 0.94 },
  on: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.38, ease: easeOutExpo },
  },
};

function PageIndex() {
  const { isDesktop, isTablet, isMobile } = useResponsive();
  const { scrollYProgress } = useScroll();

  const [activeSection, setActiveSection] = useState<number>(0);
  const [sidebarHeight, setSidebarHeight] = useState<number>(0);
  const [isProgrammaticScroll, setIsProgrammaticScroll] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [project] = useState<Data[]>([
    {
      key: 'Boundary',
      date: '2024.10 - 2025.10',
      experience: [
        'Next.js 기반 SSR 구현 → SEO 최적화 및 초기 로딩 속도 개선',
        'Jotai 기반 전역 상태 관리 → 단순한 상태로 렌더링 최적화',
        'React Hook Form + Zod 기반 폼 유효성 검사 → 타입 안전성과 런타임 오류 감소',
        'next-intl + Google Spreadsheet 기반 다국어 시스템 → 글로벌 사용자 대응 강화',
        'Google Maps API 기반 지도 컴포넌트 → 사용자 친화적 위치 정보 제공',
        'Tailwind CSS 기반 UI 개발 → 생산성 향상과 일관된 스타일',
      ],
      people: '기획1, 디자인 3, 프론트엔드 2, 백엔드 2, 세일즈 포스 1',
      stack: [
        { name: 'Next.js', icon: <SiNextdotjs /> },
        { name: 'TypeScript', icon: <SiTypescript /> },
        { name: 'React Hook Form', icon: <SiReacthookform /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
      ],
      subTitle: '신규 사이트 및 관리자 사이트 개발',
      title: 'Hanwha Vision - STEP',
      link: [
        {
          name: '서비스 링크',
          url: 'https://step.hanwhavision.com/kr/login',
        },
      ],
    },
    {
      key: 'Boundary',
      date: '2023.10 - 2024.10',
      experience: [
        'React 기반 CSR 구현 → 사용자 상호작용 응답 속도 개선',
        'React Query 기반 데이터 패칭 → 캐싱과 리트라이로 성능 및 안정성 개선',
        'Recoil 기반 전역 상태 관리 → 단순하고 직관적인 상태 로직',
        'next-intl + Google Spreadsheet 기반 다국어 시스템 → 글로벌 사용자 대응',
        'React PDF 기반 PDF 생성/다운로드 → 사용자 편의성과 문서 자동화',
        'MUI·Ant Design·styled-components 기반 UI 개발 → 일관된 디자인과 생산성 향상',
      ],
      people: '기획&디자인 2, 프론트엔드 5, 백엔드 6',
      stack: [
        { name: 'React.js', icon: <FaReact /> },
        { name: 'TypeScript', icon: <SiTypescript /> },
        { name: 'Ant Design', icon: <SiAntdesign /> },
        { name: 'React Query', icon: <SiReactquery /> },
        { name: 'Recoil', icon: <SiRecoil /> },
        { name: 'styled-components', icon: <SiStyledcomponents /> },
      ],
      subTitle: '제약 회사 내부 교육 및 증상, 약물 관리 내부 프로젝트 구현',
      title: 'Dream Trial',
    },
    {
      key: 'Lawdians',
      date: '2023.05 - 2023.09',
      experience: [
        'Next.js 기반 SSR 구현 → SEO 최적화 및 초기 로딩 속도 개선',
        'Apollo Client + GraphQL 기반 API 연동 → 데이터 일관성 및 효율적 통신',
        'graphql-ws 기반 실시간 기능(채팅) → 고객-관리자 실시간 소통',
        'Nodemailer + Axios 기반 메일 발송 → 사용자 요청 자동 처리',
        'Cheerio 기반 크롤링 → 외부 상품 데이터 자동 수집 및 운영 효율화',
        'SCSS Mixin 기반 반응형 스타일링 → 다양한 디바이스 대응',
        'react-js-pagination 기반 페이지네이션 → 목록 탐색성 향상',
        'react-slick 기반 캐러셀 → 프로모션 및 핵심 콘텐츠 노출 강화',
      ],
      people: '기획 1, 디자인 1, 프론트엔드 3, 백엔드 1',
      stack: [
        { name: 'Next.js', icon: <SiNextdotjs /> },
        { name: 'TypeScript', icon: <SiTypescript /> },
        { name: 'Sass', icon: <SiSass /> },
        { name: 'Apollographql', icon: <SiApollographql /> },
        { name: 'axios', icon: <SiAxios /> },
      ],
      subTitle: '상품권 판매, IT 서비스 대행 사이트 구현',
      title: '방배사',
      link: [
        {
          name: '저장소 링크',
          url: 'https://github.com/Jone4865/law_bangbaesa',
        },
      ],
    },
    {
      key: 'Lawdians',
      date: '2023.07 - 2023.08',
      experience: [
        'Apollo Client + GraphQL 기반 API 연동 → 데이터 일관성 및 효율적 통신',
        'React 기반 CSR 구현 → 사용자 상호작용 응답 속도 개선',
        'react-responsive 기반 반응형 구현 → 다양한 디바이스 대응',
        'Ant Design 기반 UI 설계·개발 → 일관된 컴포넌트 활용',
      ],
      people: '기획 1, 프론트엔드 1, 백엔드 1',
      stack: [
        { name: 'React.js', icon: <FaReact /> },
        { name: 'TypeScript', icon: <SiTypescript /> },
        { name: 'Ant Design', icon: <SiAntdesign /> },
        { name: 'Apollographql', icon: <SiApollographql /> },
        { name: 'styled-components', icon: <SiStyledcomponents /> },
      ],
      subTitle: '방배사 프로젝트 관리자 홈페이지 구현',
      title: '방배사 CMS',
      link: [
        {
          name: '저장소 링크',
          url: 'https://github.com/Jone4865/law_cms_bangbaesa',
        },
      ],
    },
    {
      key: 'Lawdians',
      date: '2023.04 - 2023.05',
      experience: [
        'Apollo Client + GraphQL 기반 API 연동 → 데이터 일관성 및 효율적 통신',
        'React 기반 CSR 구현 → 사용자 상호작용 응답 속도 개선',
        'react-responsive 기반 반응형 구현 → 다양한 디바이스 대응',
        'Ant Design 기반 UI 설계·개발 → 일관된 컴포넌트 활용',
      ],
      people: '기획 1, 프론트엔드 2, 백엔드 1',
      stack: [
        { name: 'React.js', icon: <FaReact /> },
        { name: 'TypeScript', icon: <SiTypescript /> },
        { name: 'Ant Design', icon: <SiAntdesign /> },
        { name: 'Apollographql', icon: <SiApollographql /> },
        { name: 'styled-components', icon: <SiStyledcomponents /> },
      ],
      subTitle: '자사 쇼핑몰 CMS 개발 대비 템플릿 구현',
      title: '자사 쇼핑몰 CMS 템플릿',
      link: [
        {
          name: '저장소 링크',
          url: 'https://github.com/Jone4865/law_cms_shopSolution',
        },
      ],
    },
    {
      key: 'Lawdians',
      date: '2023.02 - 2023.03',
      experience: [
        'Apollo Client + GraphQL 기반 API 연동 → 데이터 일관성 및 효율적 통신',
        'React 기반 CSR 구현 → 사용자 상호작용 응답 속도 개선',
        'react-responsive 기반 반응형 구현 → 다양한 디바이스 대응',
        'Ant Design 기반 UI 설계·개발 → 일관된 컴포넌트 활용',
      ],
      people: '기획 1, 프론트엔드 2, 백엔드 1',
      stack: [
        { name: 'React.js', icon: <FaReact /> },
        { name: 'TypeScript', icon: <SiTypescript /> },
        { name: 'Ant Design', icon: <SiAntdesign /> },
        { name: 'Apollographql', icon: <SiApollographql /> },
        { name: 'styled-components', icon: <SiStyledcomponents /> },
      ],
      subTitle: '리얼파이 프로젝트 관리자 홈페이지 구현',
      title: '리얼파이 CMS',
      link: [
        {
          name: '저장소 링크',
          url: 'https://github.com/Jone4865/law_cms_realfi',
        },
      ],
    },
    {
      key: 'Lawdians',
      date: '2023.01 - 2023.02',
      experience: [
        'Next.js 기반 SSR 구현 → SEO 최적화 및 초기 로딩 속도 개선',
        'Nodemailer + Axios 기반 메일 발송 → 사용자 요청 자동 처리',
        'KakaoMap API 기반 지도 컴포넌트 → 직관적 위치 정보 제공',
        'SCSS Mixin 기반 반응형 스타일링 → 다양한 디바이스 대응',
      ],
      people: '기획 1, 디자인 1, 프론트엔드 1',
      stack: [
        { name: 'Next.js', icon: <SiNextdotjs /> },
        { name: 'TypeScript', icon: <SiTypescript /> },
        { name: 'Sass', icon: <SiSass /> },
        { name: 'axios', icon: <SiAxios /> },
      ],
      subTitle: '기업 홈페이지 구현',
      title: '로디언즈 홀딩스',
      link: [
        {
          name: '저장소 링크',
          url: 'https://github.com/Jone4865/law_lawdiansHoldings',
        },
        {
          name: '관련영상 링크',
          url: 'https://drive.google.com/file/d/12jmJR7EIZw0DbMfhUEqaU9RaIU8XM2w0/view?usp=drive_link',
        },
      ],
    },
    {
      key: 'Lawdians',
      date: '2023.01 - 2023.01',
      experience: [
        'Next.js 기반 SSR 구현 → SEO 최적화 및 초기 로딩 속도 개선',
        'react-responsive 기반 반응형 구현 → 다양한 디바이스 대응',
        'Storybook 기반 컴포넌트 문서화 → 재사용성과 협업 효율 향상',
        'SCSS 기반 스타일링 → 일관된 스타일과 유지보수성 강화',
      ],
      people: '기획 1, 디자인 1, 프론트엔드 1',
      stack: [
        { name: 'Next.js', icon: <SiNextdotjs /> },
        { name: 'TypeScript', icon: <SiTypescript /> },
        { name: 'Sass', icon: <SiSass /> },
        { name: 'StoryBook', icon: <SiStorybook /> },
      ],
      subTitle: '조각거래 플랫폼 랜딩페이지 구현',
      title: '리얼파이 랜딩페이지',
      link: [
        {
          name: '저장소 링크',
          url: 'https://github.com/Jone4865/law_landing_realfi',
        },
        {
          name: '관련영상 링크',
          url: 'https://drive.google.com/file/d/1-C0ixxMNVXRO6CDO9l-dtJPNETvxTWqG/view?usp=drive_link',
        },
      ],
    },
    {
      key: 'Lawdians',
      date: '2023.01 - 2023.01',
      experience: [
        'Next.js 기반 SSR 구현 → SEO 최적화 및 초기 로딩 속도 개선',
        'Nodemailer + Axios 기반 메일 발송 → 사용자 요청 자동 처리',
        'SCSS Mixin 기반 반응형 스타일링 → 다양한 디바이스 대응',
        'Storybook 기반 컴포넌트 문서화 → 재사용성과 협업 효율 향상',
      ],
      people: '기획 1, 디자인 1, 프론트엔드 1',
      stack: [
        { name: 'Next.js', icon: <SiNextdotjs /> },
        { name: 'TypeScript', icon: <SiTypescript /> },
        { name: 'Sass', icon: <SiSass /> },
        { name: 'StoryBook', icon: <SiStorybook /> },
        { name: 'axios', icon: <SiAxios /> },
      ],
      subTitle: '마케팅 운용 및 운영 대행 사이트 랜딩페이지 구현',
      title: '감동기획 랜딩페이지',
      link: [
        {
          name: '저장소 링크',
          url: 'https://github.com/Jone4865/law_landing_gamdongplan',
        },
        {
          name: '관련영상 링크',
          url: 'https://drive.google.com/file/d/1PvmixTpkjmTdYCh2hcXi-TlG_pLokSN7/view?usp=drive_link',
        },
      ],
    },
    {
      key: 'Lawdians',
      date: '2023.01 - 2023.01',
      experience: [
        'Next.js 기반 SSR 구현 → SEO 최적화 및 초기 로딩 속도 개선',
        'Nodemailer + Axios 기반 메일 발송 → 사용자 요청 자동 처리',
        'Cheerio 기반 크롤링 → 외부 데이터 자동 수집 및 운영 효율화',
        'SCSS Mixin 기반 반응형 스타일링 → 다양한 디바이스 대응',
        'Storybook 기반 컴포넌트 문서화 → 재사용성과 협업 효율 향상',
      ],
      people: '기획 1, 디자인 1, 프론트엔드 1',
      stack: [
        { name: 'Next.js', icon: <SiNextdotjs /> },
        { name: 'TypeScript', icon: <SiTypescript /> },
        { name: 'Sass', icon: <SiSass /> },
        { name: 'StoryBook', icon: <SiStorybook /> },
        { name: 'axios', icon: <SiAxios /> },
      ],
      subTitle: '상품권 판매, IT 서비스 대행 사이트 랜딩페이지',
      title: '방배사 랜딩페이지',
      link: [
        {
          name: '저장소 링크',
          url: 'https://github.com/Jone4865/law_landing_bangbaesa',
        },
        {
          name: '관련영상 링크',
          url: 'https://drive.google.com/file/d/1vhBm38_C92M3ov5CCcB_MgwmsGebARqp/view?usp=drive_link',
        },
      ],
    },
    {
      key: 'Hanghae99',
      date: '2022.08 - 2022.09',
      experience: [
        'Socket.io 기반 실시간 기능(채팅/게임) → 사용자 간 즉각적 상호작용',
        'Redux Toolkit 기반 전역 상태 관리 → 상태 로직 단순화 및 유지보수성 향상',
        'React 기반 CSR 구현 → 사용자 상호작용 응답 속도 개선',
        'Axios 기반 API 요청/응답 처리 → 안정적 서버-클라이언트 통신',
        'Amazon S3·CloudFront·ACM 기반 HTTPS 배포 자동화 → 안정적 운영 및 보안 강화',
        'Kakao Login API 기반 소셜 로그인 → 간편한 인증 제공',
        'styled-components 기반 스타일링 → 일관된 스타일과 유지보수성 강화',
      ],
      people: '디자인 1, 프론트엔드 2, 백엔드 3',
      stack: [
        { name: 'React.js', icon: <FaReact /> },
        { name: 'redux-thunk', icon: <TbBrandRedux /> },
        { name: 'styled-components', icon: <SiStyledcomponents /> },
        { name: 'Socket.IO', icon: <SiSocketdotio /> },
        { name: 'Amazon S3', icon: <FaAmazon /> },
        { name: 'Amazon CloudFront', icon: <FaAmazon /> },
        { name: 'AWS Certificate Manager', icon: <FaAws /> },
        { name: 'axios', icon: <SiAxios /> },
      ],
      subTitle: '1:1 턴제 심리 카드게임',
      title: '덜지니어스',
      link: [
        {
          name: '저장소 링크',
          url: 'https://github.com/Jone4865/TherGeniusGame',
        },
        {
          name: '관련영상 링크',
          url: 'https://www.youtube.com/watch?v=ESSO1rTWOhY',
        },
      ],
    },
    {
      key: 'Hanghae99',
      date: '2022.08 - 2022.08',
      experience: [
        'Redux Toolkit 기반 전역 상태 관리 → 상태 로직 단순화 및 유지보수성 향상',
        'React 기반 CSR 구현 → 사용자 상호작용 응답 속도 개선',
        'Amazon S3·CloudFront 기반 배포 → 안정적 서비스 운영 환경',
        'Axios 기반 API 요청/응답 처리 → 서버-클라이언트 통신 효율화',
        'styled-components 기반 스타일링 → 일관된 스타일과 유지보수성 강화',
      ],
      people: '디자인 1, 프론트엔드 2, 백엔드 3',
      stack: [
        { name: 'React.js', icon: <FaReact /> },
        { name: 'react-redux', icon: <TbBrandRedux /> },
        { name: 'styled-components', icon: <SiStyledcomponents /> },
        { name: 'axios', icon: <SiAxios /> },
      ],
      subTitle: '웹 스무고개 게임 구현',
      title: '20-Questions',
      link: [
        {
          name: '저장소 링크',
          url: 'https://github.com/Jone4865/20questions',
        },
      ],
    },
  ]);

  const typicalComponent = useMemo(
    () => (
      <Typical
        steps={[
          '안녕하세요. 키보드 위를 서핑하는,',
          1000,
          'Developer 채종원의 포트폴리오입니다.',
          1000,
        ]}
        loop={3}
      />
    ),
    [],
  );

  // 스크롤 위치에 따른 활성 섹션 계산
  const handleScroll = useCallback(() => {
    // 프로그래매틱 스크롤 중에는 activeSection을 업데이트하지 않음 (이전 뷰 유지)
    if (isProgrammaticScroll) {
      return;
    }

    const scrollY = window.scrollY;
    const sectionHeight = window.innerHeight;
    let newActiveSection = 0;

    if (isMobile) {
      // 모바일: 사이더 높이 + 100px 이후부터 섹션 계산
      const introThreshold = sidebarHeight + 100;
      if (scrollY < introThreshold) {
        newActiveSection = -1; // 사이더만 보이는 상태
      } else {
        const adjustedScrollY = scrollY - introThreshold;
        // 섹션 경계를 더 정확하게 계산 (시작 지점 기준)
        const currentSection = Math.floor(adjustedScrollY / sectionHeight); // Home부터 시작
        const maxSection = 1 + project.length;
        newActiveSection = Math.min(Math.max(currentSection, 0), maxSection);
      }
    } else {
      // 데스크톱: 기존 로직
      const currentSection = Math.floor(scrollY / sectionHeight);
      const maxSection = 1 + project.length;
      newActiveSection = Math.min(currentSection, maxSection);
    }

    setActiveSection((prev) => {
      // 이전 섹션과 다를 때만 업데이트하여 중복 활성화 방지
      if (newActiveSection !== prev) {
        return newActiveSection;
      }
      return prev;
    });
  }, [isMobile, sidebarHeight, project.length, isProgrammaticScroll]);

  useEffect(() => {
    // 스크롤 이벤트를 throttling하여 중복 호출 방지
    let ticking = false;
    let lastScrollY = window.scrollY;
    let checkFrame: number | null = null;

    const checkScrollComplete = () => {
      const currentScrollY = window.scrollY;

      // 스크롤 위치가 변하지 않았으면 스크롤 완료로 간주
      if (Math.abs(currentScrollY - lastScrollY) < 1) {
        setIsProgrammaticScroll(false);
        setShowLoader(false);

        // 스크롤 완료 후 현재 위치에 맞는 섹션으로 업데이트
        const sectionHeight = window.innerHeight;
        let newActiveSection = 0;

        if (isMobile) {
          const introThreshold = sidebarHeight + 100;
          if (currentScrollY < introThreshold) {
            newActiveSection = -1;
          } else {
            const adjustedScrollY = currentScrollY - introThreshold;
            const currentSection = Math.floor(adjustedScrollY / sectionHeight);
            const maxSection = 1 + project.length;
            newActiveSection = Math.min(Math.max(currentSection, 0), maxSection);
          }
        } else {
          const currentSection = Math.floor(currentScrollY / sectionHeight);
          const maxSection = 1 + project.length;
          newActiveSection = Math.min(currentSection, maxSection);
        }

        setActiveSection(newActiveSection);
        checkFrame = null;
      } else {
        lastScrollY = currentScrollY;
        // 계속 스크롤 중이면 다음 프레임에서 다시 확인
        checkFrame = requestAnimationFrame(checkScrollComplete);
      }
    };

    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }

      // 프로그래매틱 스크롤 중일 때, 스크롤 위치 변화를 추적하여 스크롤 완료 감지
      if (isProgrammaticScroll) {
        if (checkFrame !== null) {
          cancelAnimationFrame(checkFrame);
        }
        checkFrame = requestAnimationFrame(checkScrollComplete);
      } else {
        lastScrollY = window.scrollY;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll);
    handleScroll(); // 초기 실행

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (checkFrame !== null) {
        cancelAnimationFrame(checkFrame);
      }
    };
  }, [handleScroll, isProgrammaticScroll, isMobile, sidebarHeight, project.length]);

  // 사이더 높이 측정
  useEffect(() => {
    const measureSidebarHeight = () => {
      if (isMobile) {
        const siderElement = document.querySelector('[data-sider]') as HTMLElement;
        if (siderElement) {
          setSidebarHeight(siderElement.scrollHeight);
        }
      }
    };

    // 초기 측정
    measureSidebarHeight();

    // 리사이즈 시 재측정
    window.addEventListener('resize', measureSidebarHeight);

    return () => {
      window.removeEventListener('resize', measureSidebarHeight);
    };
  }, [isMobile]);

  return (
    <Container isDesktop={isDesktop} isTablet={isTablet}>
      <Wrap
        totalSections={2 + project.length}
        style={
          isMobile
            ? { height: `calc(${2 + project.length} * 100vh + ${sidebarHeight + 100}px)` }
            : undefined
        }
      >
        <PrograssStyle isDesktop={isDesktop} style={{ scaleX: scrollYProgress }} />

        {/* 페이지 인디케이터 - 모바일에서는 Home 활성화 시에만 표시 */}
        {(activeSection >= 0 || !isMobile) && (
          <PageIndicator isDesktop={isDesktop} isTablet={isTablet}>
            {/* Home */}
            <DotGroup>
              <DotLabel>Home</DotLabel>
              <PageDot
                isActive={activeSection === 0}
                onClick={() => {
                  setIsProgrammaticScroll(true);
                  setShowLoader(true);
                  const targetScroll = isMobile ? sidebarHeight + 100 : 0 * window.innerHeight;
                  window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                }}
              />
            </DotGroup>

            {/* Intro */}
            <DotGroup>
              <DotLabel>Intro</DotLabel>
              <PageDot
                isActive={activeSection === 1}
                onClick={() => {
                  setIsProgrammaticScroll(true);
                  setShowLoader(true);
                  const targetScroll = isMobile
                    ? sidebarHeight + 100 + window.innerHeight
                    : 1 * window.innerHeight;
                  window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                }}
              />
            </DotGroup>

            {/* Projects */}
            <DotGroup>
              <DotLabel>Projects</DotLabel>
              {project.map((_, idx) => (
                <PageDot
                  key={idx}
                  isActive={activeSection === idx + 2}
                  onClick={() => {
                    setIsProgrammaticScroll(true);
                    setShowLoader(true);
                    const targetScroll = isMobile
                      ? sidebarHeight + 100 + (idx + 2) * window.innerHeight
                      : (idx + 2) * window.innerHeight;
                    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                  }}
                />
              ))}
            </DotGroup>
          </PageIndicator>
        )}

        {/* 스크롤 중 로딩 뷰 */}
        {isProgrammaticScroll && showLoader && (
          <ScrollLoadingContainer isDesktop={isDesktop} isTablet={isTablet}>
            <LoadingContent>
              <LoadingSpinner>
                <SpinnerCircle />
                <SpinnerCircle />
                <SpinnerCircle />
              </LoadingSpinner>
              <LoadingText>이동 중...</LoadingText>
            </LoadingContent>
          </ScrollLoadingContainer>
        )}

        {/* 섹션 0: TypingWrapper */}
        <SectionContainer
          isActive={!isProgrammaticScroll && activeSection === 0}
          isDesktop={isDesktop}
          isTablet={isTablet}
          initial={false}
          animate={{
            opacity: !isProgrammaticScroll && activeSection === 0 ? 1 : 0,
            y: !isProgrammaticScroll && activeSection === 0 ? 0 : 16,
          }}
          transition={sectionTransition}
        >
          <TypingWrapper isDesktop={isDesktop} isTablet={isTablet}>
            <HomeHeroCard
              typicalContent={typicalComponent}
              backgroundSrc={String(backgroundImage)}
            />
          </TypingWrapper>
        </SectionContainer>

        {/* 섹션 1: Invitation */}
        <SectionContainer
          isActive={!isProgrammaticScroll && activeSection === 1}
          isDesktop={isDesktop}
          isTablet={isTablet}
          initial={false}
          animate={{
            opacity: !isProgrammaticScroll && activeSection === 1 ? 1 : 0,
            y: !isProgrammaticScroll && activeSection === 1 ? 0 : 16,
          }}
          transition={sectionTransition}
        >
          <Invitation
            isDesktop={isDesktop}
            isTablet={isTablet}
            initial={false}
            animate={
              !isProgrammaticScroll && activeSection === 1
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 20, scale: 0.98 }
            }
            transition={{
              duration: 0.55,
              delay: !isProgrammaticScroll && activeSection === 1 ? 0.1 : 0,
              ease: easeOutExpo,
            }}
          >
            <div>
              시작은 주변의 권유로 시작하게 되었습니다.
              <br />
              <span>"처음에는 나의 뜻이 아니었다."</span> 말할 수 있는 이유는, 이제는 제가 원하기
              때문입니다.
              <br />
              <br />
              직접 코드를 짜면서 구상한대로 화면에 그려질 때의 <span>성취감</span>
              과<br />
              지속적으로 의사소통 하며 팀원들과 퍼즐 맞추듯이 만들어가는 과정에서 느껴지는{' '}
              <span>재미</span>,<br />
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
        </SectionContainer>

        {/* 섹션 2~N: 각 프로젝트 */}
        {project.map((v, idx) => (
          <SectionContainer
            key={`${v.title}-${v.date}`}
            isActive={!isProgrammaticScroll && activeSection === idx + 2}
            isDesktop={isDesktop}
            isTablet={isTablet}
            initial={false}
            animate={{
              opacity: !isProgrammaticScroll && activeSection === idx + 2 ? 1 : 0,
              y: !isProgrammaticScroll && activeSection === idx + 2 ? 0 : 16,
            }}
            transition={sectionTransition}
          >
            <CardWrapper
              isDesktop={isDesktop}
              isTablet={isTablet}
              isMobile={isMobile}
              initial={false}
              variants={cardRevealVariants}
              animate={!isProgrammaticScroll && activeSection === idx + 2 ? 'on' : 'off'}
              whileHover={{ y: -4, transition: { duration: 0.22, ease: easeOutExpo } }}
            >
              <CardHeader>
                <OrgPill>{v.key}</OrgPill>
                <LineOne isDesktop={isDesktop}>
                  <CardTitle>{v.title}</CardTitle>
                  <CardMeta>{v.date}</CardMeta>
                </LineOne>
              </CardHeader>
              <MetaBlock>
                <MetaLabel>목적</MetaLabel>
                <MetaValue>{v.subTitle}</MetaValue>
              </MetaBlock>
              <MetaBlock>
                <MetaLabel>인원</MetaLabel>
                <MetaValue>{v.people}</MetaValue>
              </MetaBlock>
              <MetaBlock>
                <MetaLabel>경험</MetaLabel>
                <ExperienceList>
                  {v.experience.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ExperienceList>
              </MetaBlock>
              <StackRow
                aria-label="기술 스택"
                initial={false}
                variants={stackParentVariants}
                animate={!isProgrammaticScroll && activeSection === idx + 2 ? 'on' : 'off'}
              >
                {v.stack.map((item) => (
                  <StackChip
                    key={item.name}
                    variants={stackChipVariants}
                    whileHover={{ y: -3, scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  >
                    <span className="ico">{item.icon}</span>
                    <span className="lbl">{item.name}</span>
                  </StackChip>
                ))}
              </StackRow>
              {v.link && v.link.length > 0 && (
                <LinkBlock>
                  {v.link.map((item) => (
                    <ExternalLink
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
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
          </SectionContainer>
        ))}
      </Wrap>
      {activeSection >= 0 && activeSection < 1 + project.length && (
        <GlobalScrollHint
          isMobile={isMobile}
          onClick={() => {
            setIsProgrammaticScroll(true);
            setShowLoader(false);
            const next = Math.min(activeSection + 1, 1 + project.length);
            const vh = window.innerHeight;
            const top = isMobile ? sidebarHeight + 100 + next * vh : next * vh;
            window.scrollTo({ top, behavior: 'smooth' });
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
        >
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{
              duration: 1.45,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ display: 'flex' }}
          >
            <FaChevronDown />
          </motion.span>
        </GlobalScrollHint>
      )}
    </Container>
  );
}

export default PageIndex;

const SIDER_RAIL = 320;

const Container = styled.div<{ isDesktop: boolean; isTablet: boolean }>`
  margin-left: ${({ isDesktop, isTablet }) => (isDesktop || isTablet ? `${SIDER_RAIL}px` : '0')};
`;

const Wrap = styled.div<{ totalSections: number }>`
  height: ${({ totalSections }) => totalSections * 100}vh;
  background: ${({ theme }) => theme.canvasGradient};
`;

const SectionContainer = styled(motion.div)<{
  isActive: boolean;
  isDesktop?: boolean;
  isTablet?: boolean;
}>`
  position: fixed;
  top: 0;
  left: ${({ isDesktop, isTablet }) => (isDesktop || isTablet ? `${SIDER_RAIL}px` : '0')};
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(16px, 4vw, 32px);
  box-sizing: border-box;
  z-index: ${({ isActive }) => (isActive ? 10 : 1)};
  pointer-events: ${({ isActive }) => (isActive ? 'auto' : 'none')};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    opacity: ${({ isActive }) => (isActive ? 1 : 0)};
    transition: opacity 0.6s ease;
    background: radial-gradient(
      ellipse 85% 65% at 50% 38%,
      ${({ theme }) => theme.accentMuted},
      transparent 68%
    );
    pointer-events: none;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const TypingWrapper = styled.div<{
  isDesktop: boolean;
  isTablet: boolean;
}>`
  position: ${({ isDesktop, isTablet }) => (isDesktop || isTablet ? 'relative' : 'absolute')};
  top: ${({ isDesktop, isTablet }) => (isDesktop || isTablet ? '0' : '50%')};
  transform: ${({ isDesktop, isTablet }) => (isDesktop || isTablet ? 'none' : 'translateY(-50%)')};
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: min(920px, 94vw);
  margin: 0 auto;
  height: ${({ isDesktop, isTablet }) =>
    isDesktop ? 'min(52vh, 520px)' : isTablet ? '420px' : '280px'};
  padding: ${({ isDesktop, isTablet }) => (isDesktop || isTablet ? '0' : '0 20px')};
`;

const Invitation = styled(motion.div)<{ isDesktop: boolean; isTablet: boolean }>`
  width: min(640px, 92%);
  margin: 0 auto;
  padding: clamp(24px, 4vw, 40px);
  border-radius: 20px;
  background: ${({ theme }) => theme.cardColor};
  color: ${({ theme }) => theme.cardText};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  box-shadow: ${({ theme }) => theme.shadowCard};
  backdrop-filter: blur(12px);
  font-weight: 500;
  font-size: ${({ isDesktop, isTablet }) => (isDesktop ? '15px' : isTablet ? '14px' : '13px')};
  line-height: 1.75;
  letter-spacing: -0.01em;

  span {
    color: ${({ theme }) => theme.accent};
    font-weight: 700;
  }
`;

const PrograssStyle = styled(motion.div)<{ isDesktop: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: ${({ theme }) => theme.progressGradient};
  transform-origin: 0%;
  z-index: 3;
  margin-left: ${({ isDesktop }) => (isDesktop ? `${SIDER_RAIL}px` : '0')};
  box-shadow: 0 -4px 20px ${({ theme }) => theme.accentMuted};
`;

const CardWrapper = styled(motion.div)<{
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}>`
  width: min(720px, 94%);
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  margin: 0 auto;
  padding: clamp(22px, 3vw, 32px);
  border-radius: 22px;
  font-size: 14px;
  line-height: 1.55;
  letter-spacing: -0.01em;

  background: ${({ theme }) => theme.cardColor};
  color: ${({ theme }) => theme.cardText};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  box-shadow: ${({ theme }) => theme.shadowCard};
  backdrop-filter: blur(14px);

  display: flex;
  flex-direction: column;
  gap: 18px;

  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadowElevated};
  }

  ${({ isMobile }) =>
    isMobile &&
    css`
      font-size: 13px;
      padding: 18px;
    `}
`;

const CardHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 4px;
  border-bottom: 1px solid ${({ theme }) => theme.cardBorder};
`;

const OrgPill = styled.span`
  align-self: flex-start;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.accent};
  background: ${({ theme }) => theme.chipBg};
  border: 1px solid ${({ theme }) => theme.chipBorder};
`;

const CardTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.15rem, 2.2vw, 1.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.cardText};
  line-height: 1.25;
`;

const CardMeta = styled.time`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.cardTextMuted};
  white-space: nowrap;
`;

const LineOne = styled.div<{ isDesktop: boolean }>`
  display: flex;
  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')};
  align-items: ${({ isDesktop }) => (isDesktop ? 'flex-end' : 'flex-start')};
  justify-content: space-between;
  gap: ${({ isDesktop }) => (isDesktop ? '16px' : '8px')};
`;

const MetaBlock = styled.div`
  display: grid;
  gap: 6px;
`;

const MetaLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.accent};
`;

const MetaValue = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.cardTextMuted};
  font-size: 14px;
  word-break: keep-all;
`;

const ExperienceList = styled.ul`
  margin: 0;
  padding-left: 1.15rem;
  color: ${({ theme }) => theme.cardTextMuted};
  font-size: 14px;

  li {
    margin-bottom: 8px;
    padding-left: 4px;
    word-break: keep-all;
  }

  li:last-child {
    margin-bottom: 0;
  }
`;

const StackRow = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const StackChip = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.cardText};
  background: ${({ theme }) => theme.chipBg};
  border: 1px solid ${({ theme }) => theme.chipBorder};
  cursor: default;
  white-space: nowrap;

  .ico {
    display: flex;
    font-size: 16px;
    opacity: 0.95;
  }

  .lbl {
    letter-spacing: -0.01em;
  }
`;

const LinkBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 4px;
`;

const ExternalLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  color: ${({ theme }) => theme.accentContrast};
  background: ${({ theme }) => theme.accent};
  border: 1px solid transparent;
  box-shadow: 0 4px 16px ${({ theme }) => theme.accentMuted};

  .arrow {
    font-size: 14px;
    opacity: 0.9;
  }

  &:hover {
    filter: brightness(1.05);
  }
`;

const PageIndicator = styled.div<{ isDesktop?: boolean; isTablet?: boolean }>`
  position: fixed;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 14px;
  z-index: 1000;
  padding: 14px 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.indicatorRail};
  border: 1px solid ${({ theme }) => theme.siderBorder};
  backdrop-filter: blur(12px);
`;

const DotGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const DotLabel = styled.div`
  color: ${({ theme }) => theme.textMuted};
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
`;

const PageDot = styled.div<{ isActive: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ isActive, theme }) => (isActive ? theme.accent : theme.indicatorDot)};
  box-shadow: ${({ isActive, theme }) => (isActive ? `0 0 0 3px ${theme.accentMuted}` : 'none')};
  cursor: pointer;
  transition:
    transform 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease;
  transform: scale(${({ isActive }) => (isActive ? 1.15 : 1)});

  &:hover {
    background-color: ${({ theme }) => theme.accent};
    transform: scale(1.25);
  }
`;

const GlobalScrollHint = styled(motion.div)<{ isMobile: boolean }>`
  position: fixed;
  left: ${({ isMobile }) => (isMobile ? '50%' : `calc(50% + ${SIDER_RAIL / 2}px)`)};
  translate: -50% 0;
  bottom: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 9999px;
  background: ${({ theme }) => theme.cardColor};
  color: ${({ theme }) => theme.accent};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  box-shadow: ${({ theme }) => theme.shadowCard};
  cursor: pointer;
  z-index: 1001;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadowElevated};
  }
`;

const ScrollLoadingContainer = styled.div<{ isDesktop?: boolean; isTablet?: boolean }>`
  position: fixed;
  top: 0;
  left: ${({ isDesktop, isTablet }) => (isDesktop || isTablet ? `${SIDER_RAIL}px` : '0')};
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, rgba(6, 8, 12, 0.92) 0%, rgba(18, 22, 32, 0.94) 100%);
  backdrop-filter: blur(24px);
  z-index: 100;
  animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  padding: 36px 44px;
  border-radius: 20px;
  background: ${({ theme }) => theme.cardColor};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  box-shadow: ${({ theme }) => theme.shadowElevated};
`;

const LoadingSpinner = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpinnerCircle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top-color: ${({ theme }) => theme.accent};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  &:nth-child(1) {
    animation-duration: 1s;
    border-top-color: ${({ theme }) => theme.accent};
  }

  &:nth-child(2) {
    width: 80%;
    height: 80%;
    animation-duration: 1.2s;
    animation-direction: reverse;
    border-top-color: ${({ theme }) => theme.accentMuted};
  }

  &:nth-child(3) {
    width: 60%;
    height: 60%;
    animation-duration: 0.8s;
    border-top-color: ${({ theme }) => theme.accentMuted};
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.div`
  color: ${({ theme }) => theme.cardText};
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    border-radius: 2px;
    background: ${({ theme }) => theme.progressGradient};
    animation: expand 1.5s ease-in-out infinite;
  }

  @keyframes expand {
    0%,
    100% {
      width: 0;
      opacity: 0;
    }
    50% {
      width: 100%;
      opacity: 1;
    }
  }
`;
