# Portfolio

프론트엔드 개발자 채종원의 포트폴리오 사이트입니다.

**Live:** https://jone4865-portfolio.vercel.app/

## 실행

```bash
yarn install
yarn start      # http://localhost:3000
yarn build      # production 빌드
yarn format     # Prettier
```

Node 18+ 권장. CRA(`react-scripts`) 기반입니다.

## 페이지

| 경로 | 설명 |
|------|------|
| `/` | 메인 — 히어로, 소개, 스킬 차트, 프로젝트 카드 |
| `/test` | UI 컴포넌트 데모 (버튼, 폼, 카드 등) |

메인은 풀페이지 섹션 스크롤입니다. 휠·키보드(↑↓)로 섹션을 이동하고, 사이드바에서 프로젝트를 바로 선택할 수 있습니다. 라이트/다크 테마는 localStorage에 저장됩니다.

## 스택

React 18 · TypeScript · styled-components · framer-motion · Three.js (`@react-three/fiber`) · react-router-dom · Vercel Analytics

## 폴더 구조

```
src/
├── app/           AppShell, BodyBackground
├── page/          메인·404·컴포넌트 데모 페이지
├── component/     UI, 사이드바, 3D 배경, 차트
├── hooks/         반응형, 섹션 네비게이션
├── data/          프로필, 프로젝트, 테마, 카피
├── constants/     레이아웃, 애니메이션, Three.js 상수
├── types/         공용·컴포넌트 타입
├── contexts/      테마 Context
└── styled/        GlobalStyle, styled-components 테마 re-export
```

타입·스타일·정적 데이터는 컴포넌트 파일과 분리해 두었습니다. import는 `tsconfig`의 `baseUrl: "src"` 기준 절대 경로(`hooks`, `data/projects` 등)를 씁니다.

## 배포

Vercel에 연결해 두었습니다. `main` 브랜치 push 시 자동 배포됩니다.
