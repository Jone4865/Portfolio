import { ReactNode, useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import styled, { css } from 'styled-components';
import Typical from 'react-typical';

// icon들 — FaAmazon/FaAws/SiSocketdotio/SiStorybook/TbBrandRedux 는 주석 처리된 프로젝트 복원용
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
  SiVite,
  SiVuedotjs,
} from 'react-icons/si';
import { TbBrandRedux } from 'react-icons/tb';

import backgroundImage from '../../src/assets/image/background.jpg';

import useResponsive from '../hooks/useResponsive';
import HomeHeroCard from './homeHero/HomeHeroCard';
import SkillInsight from '../component/charts/SkillInsight';

/* 주석 처리된 프로젝트 복원용 아이콘 — 삭제하지 않음 */
const _commentedProjectIcons = {
  FaAmazon,
  FaAws,
  SiSocketdotio,
  SiStorybook,
  TbBrandRedux,
};
void _commentedProjectIcons;

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

/** Home + Intro + Skills */
const SECTION_BASE = 3;

const cardRevealVariants = {
  off: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
  },
  on: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0 },
  },
};

const stackParentVariants = {
  off: {},
  on: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};

const stackChipVariants = {
  off: { opacity: 1, y: 0, scale: 1 },
  on: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0 },
  },
};

function PageIndex() {
  const { isDesktop, isTablet, isMobile } = useResponsive();
  const { scrollYProgress } = useScroll();

  const [activeSection, setActiveSection] = useState<number>(0);
  const [sidebarHeight, setSidebarHeight] = useState<number>(0);
  const pendingScrollTopRef = useRef<number | null>(null);
  const pendingSectionRef = useRef<number | null>(null);
  const isProgrammaticScrollRef = useRef(false);
  const scrollNavCleanupRef = useRef<(() => void) | null>(null);
  const [project] = useState<Data[]>([
    {
      key: 'FastPace',
      date: '2026.06 - 현재',
      experience: [
        'Vue 3 + TypeScript + Vite + Naive UI 기반 HR 웹 애플리케이션 구현 → 인사·문서·전자계약·전자결재 업무 통합',
        'pnpm 모노레포 기반 웹 패키지 및 빌드·배포 흐름 정립 → 개발·운영 작업 흐름 표준화',
        'Toast UI Editor/Viewer 기반 문서 편집·조회 UI → 계약/사규/공지·템플릿 작성·미리보기 품질 향상',
        '라이트/다크·OS 테마 연동 및 문서 UI 스타일 스코프 분리 → 앱 UI와 문서 미리보기 요구사항 동시 충족',
        '리치 에디터·sanitize 기반 공지 작성 UX → HTML/마크다운 혼재 환경에서 안전한 콘텐츠 표시',
        '전자계약·전자결재·공지 등 핵심 업무 화면 개발 → 실무 사용성과 운영 안정성 강화',
      ],
      people: '개발 3',
      stack: [
        { name: 'Vue 3', icon: <SiVuedotjs /> },
        { name: 'TypeScript', icon: <SiTypescript /> },
        { name: 'Vite', icon: <SiVite /> },
      ],
      subTitle: '인사/문서/전자계약/전자결재 통합 HR 시스템',
      title: 'HR System',
      link: [
        {
          name: '서비스 링크',
          url: 'https://ai-hub.kr/hrsystem/v2/login',
        },
      ],
    },
    {
      key: 'FastPace',
      date: '2025.12 - 현재',
      experience: [
        'Vue 3 + TypeScript + Vite + SCSS 기반 웹 애플리케이션 구현 → 영업·유지보수·정산 업무 통합 관리',
        '영업/유지보수 데이터 기반 정산관리(청구·입금·지연·상태) 기능 구현 → 운영 정산 업무 효율화',
        '정산 목록 조회·필터·정렬·엑셀 다운로드 UX 최적화 → 대용량 데이터 탐색 효율 향상',
        '영업·유지보수 화면 도메인 분리 및 공통 조회 UI 패턴 적용 → 필터/정렬/표시 규칙 일관성 확보',
      ],
      people: '개발 3',
      stack: [
        { name: 'Vue 3', icon: <SiVuedotjs /> },
        { name: 'TypeScript', icon: <SiTypescript /> },
        { name: 'Vite', icon: <SiVite /> },
        { name: 'SCSS', icon: <SiSass /> },
      ],
      subTitle: '영업·유지보수·정산 통합 관리 시스템',
      title: 'Saleser',
      link: [
        {
          name: '서비스 링크',
          url: 'https://saleser.ai/',
        },
      ],
    },
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
      people: '기획 1, 디자인 2, 프론트엔드 2, 백엔드 2, Salesforce 1',
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
      people: '기획 1, 디자인 1, 프론트엔드 3, 백엔드 3',
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
    /* 자사 쇼핑몰 CMS 템플릿 이하 — 임시 숨김 (삭제하지 않음)
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
    */
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
    // 프로그래매틱 이동 중에는 스크롤 위치로 섹션을 되돌리지 않음
    // (다음 이동 시 floor 경계 전엔 항상 이전 섹션 값이 나와 깜빡임의 원인)
    if (
      isProgrammaticScrollRef.current ||
      pendingScrollTopRef.current !== null ||
      pendingSectionRef.current !== null
    ) {
      return;
    }

    const scrollY = window.scrollY;
    const sectionHeight = window.innerHeight;
    let newActiveSection = 0;

    if (isMobile) {
      const introThreshold = sidebarHeight + 100;
      if (scrollY < introThreshold) {
        newActiveSection = -1;
      } else {
        const adjustedScrollY = scrollY - introThreshold;
        const currentSection = Math.floor(adjustedScrollY / sectionHeight);
        newActiveSection = Math.min(Math.max(currentSection, 0), 2 + project.length);
      }
    } else {
      const currentSection = Math.floor(scrollY / sectionHeight);
      newActiveSection = Math.min(currentSection, 2 + project.length);
    }

    setActiveSection((prev) => (newActiveSection !== prev ? newActiveSection : prev));
  }, [isMobile, sidebarHeight, project.length]);

  const maxSection = 2 + project.length;

  const sectionScrollTop = useCallback(
    (section: number) => {
      const vh = window.innerHeight;
      if (isMobile) {
        if (section < 0) return 0;
        return sidebarHeight + 100 + section * vh;
      }
      return section * vh;
    },
    [isMobile, sidebarHeight],
  );

  const goToSection = useCallback(
    (targetSection: number) => {
      const next = Math.min(Math.max(targetSection, isMobile ? -1 : 0), maxSection);
      if (next === activeSection && pendingSectionRef.current === null) return;

      const top = sectionScrollTop(next);
      scrollNavCleanupRef.current?.();

      // 이동 중엔 handleScroll이 floor로 이전 섹션을 덮어쓰지 못하게 잠금
      // (아래로 갈 때만 경계 전까지 floor가 현재 섹션으로 남는 비대칭)
      isProgrammaticScrollRef.current = true;
      pendingScrollTopRef.current = top;
      pendingSectionRef.current = next;
      setActiveSection(next);

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const startY = window.scrollY;
      const delta = top - startY;

      const release = () => {
        if (pendingSectionRef.current !== next) return;
        pendingScrollTopRef.current = null;
        pendingSectionRef.current = null;
        isProgrammaticScrollRef.current = false;
      };

      if (reduceMotion || Math.abs(delta) < 1) {
        window.scrollTo(0, top);
        release();
        return;
      }

      // CSS smooth는 환경에 따라 무시되거나 끊길 수 있어 rAF ease로 통일
      const duration = Math.min(720, Math.max(420, Math.abs(delta) * 0.55));
      const t0 = performance.now();
      let rafId = 0;
      let done = false;

      const cleanup = () => {
        cancelAnimationFrame(rafId);
        if (scrollNavCleanupRef.current === cleanup) {
          scrollNavCleanupRef.current = null;
        }
      };

      const finish = () => {
        if (done) return;
        done = true;
        window.scrollTo(0, top);
        release();
        cleanup();
      };

      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const step = (now: number) => {
        if (pendingSectionRef.current !== next) {
          cleanup();
          return;
        }
        const t = Math.min(1, (now - t0) / duration);
        window.scrollTo(0, startY + delta * easeInOutCubic(t));
        if (t < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          finish();
        }
      };

      scrollNavCleanupRef.current = cleanup;
      rafId = requestAnimationFrame(step);
    },
    [activeSection, isMobile, maxSection, sectionScrollTop],
  );

  useEffect(
    () => () => {
      scrollNavCleanupRef.current?.();
    },
    [],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (
        key !== 'ArrowDown' &&
        key !== 'ArrowUp' &&
        key !== 'ArrowRight' &&
        key !== 'ArrowLeft'
      ) {
        return;
      }

      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        target?.isContentEditable
      ) {
        return;
      }

      e.preventDefault();
      if (key === 'ArrowDown' || key === 'ArrowRight') {
        goToSection(activeSection + 1);
      } else {
        goToSection(activeSection - 1);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeSection, goToSection]);

  useEffect(() => {
    let ticking = false;

    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [handleScroll]);

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
        totalSections={SECTION_BASE + project.length}
        style={
          isMobile
            ? {
                height: `calc(${SECTION_BASE + project.length} * 100vh + ${sidebarHeight + 100}px)`,
              }
            : undefined
        }
      >
        <PrograssStyle isDesktop={isDesktop} style={{ scaleX: scrollYProgress }} />

        {/* 카드와 겹치지 않도록 충분한 너비의 데스크톱에서만 표시 */}
        {isDesktop && (
          <PageIndicator isDesktop={isDesktop} isTablet={isTablet}>
            {/* Home */}
            <DotGroup>
              <DotLabel>Home</DotLabel>
              <PageDot isActive={activeSection === 0} onClick={() => goToSection(0)} />
            </DotGroup>

            {/* Intro */}
            <DotGroup>
              <DotLabel>Intro</DotLabel>
              <PageDot isActive={activeSection === 1} onClick={() => goToSection(1)} />
            </DotGroup>

            {/* Skills */}
            <DotGroup>
              <DotLabel>Skills</DotLabel>
              <PageDot isActive={activeSection === 2} onClick={() => goToSection(2)} />
            </DotGroup>

            {/* Projects */}
            <DotGroup>
              <DotLabel>Projects</DotLabel>
              {project.map((_, idx) => (
                <PageDot
                  key={idx}
                  isActive={activeSection === idx + SECTION_BASE}
                  onClick={() => goToSection(idx + SECTION_BASE)}
                />
              ))}
            </DotGroup>
          </PageIndicator>
        )}

        {/* 섹션 전환은 도트/하단버튼/방향키 공통 goToSection */}

        {/* 섹션 0: TypingWrapper */}
        <SectionContainer
          isActive={activeSection === 0}
          isDesktop={isDesktop}
          isTablet={isTablet}
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
          isActive={activeSection === 1}
          isDesktop={isDesktop}
          isTablet={isTablet}
        >
          <Invitation
            isDesktop={isDesktop}
            isTablet={isTablet}
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

        {/* 섹션 2: Skills Insight */}
        <SectionContainer
          isActive={activeSection === 2}
          isDesktop={isDesktop}
          isTablet={isTablet}
        >
          <SkillInsight
            active={activeSection === 2}
            isDesktop={isDesktop}
            isTablet={isTablet}
          />
        </SectionContainer>

        {/* 섹션 3~N: 각 프로젝트 */}
        {project.map((v, idx) => (
          <SectionContainer
            key={`${v.title}-${v.date}`}
            isActive={activeSection === idx + SECTION_BASE}
            isDesktop={isDesktop}
            isTablet={isTablet}
          >
            <CardWrapper
              isDesktop={isDesktop}
              isTablet={isTablet}
              isMobile={isMobile}
              initial={false}
              variants={cardRevealVariants}
              animate={activeSection === idx + SECTION_BASE ? 'on' : 'off'}
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
                animate={
                  activeSection === idx + SECTION_BASE ? 'on' : 'off'
                }
              >
                {v.stack.map((item) => (
                  <StackChip
                    key={item.name}
                    data-stack-chip={
                      activeSection === idx + SECTION_BASE
                        ? 'active'
                        : undefined
                    }
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
      {activeSection >= 0 && activeSection < 2 + project.length && (
        <GlobalScrollHint
          isMobile={isMobile}
          onClick={() => {
            goToSection(activeSection + 1);
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

const SIDER_RAIL = 300;

const Wrap = styled.div<{ totalSections: number }>`
  position: relative;
  z-index: 2;
  height: ${({ totalSections }) => totalSections * 100}vh;
  background: ${({ theme }) => theme.canvasGradient};
`;

const Container = styled.div<{ isDesktop: boolean; isTablet: boolean }>`
  position: relative;
  z-index: 2;
  margin-left: ${({ isDesktop, isTablet }) => (isDesktop || isTablet ? `${SIDER_RAIL}px` : '0')};
`;

const SectionContainer = styled.div<{
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
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  visibility: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};
  transition:
    opacity 0.32s ease,
    visibility 0s linear ${({ isActive }) => (isActive ? '0s' : '0.32s')};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    opacity: ${({ isActive }) => (isActive ? 1 : 0)};
    transition: opacity 0.28s ease;
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

const Invitation = styled.div<{ isDesktop: boolean; isTablet: boolean }>`
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

