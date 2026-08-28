import { FaAmazon, FaAws, FaReact } from 'react-icons/fa';
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
import type { Project } from '../types/project';

/* 주석 처리된 프로젝트 복원용 아이콘 — 삭제하지 않음 */
const _commentedProjectIcons = {
  FaAmazon,
  FaAws,
  SiSocketdotio,
  SiStorybook,
  TbBrandRedux,
};
void _commentedProjectIcons;

export const projects: Project[] = 
[
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
  ];
