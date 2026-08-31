# Portfolio

프론트엔드 개발자 **채종원**의 포트폴리오 사이트입니다. 풀페이지 섹션 스크롤, 라이트/다크 테마, Three.js 배경, 프로젝트 카드로 경력과 스택을 소개합니다.

**Live:** https://jone4865-portfolio.vercel.app/

## 빠른 시작

```bash
yarn install
yarn start      # http://localhost:3000
```

Node 18+ 권장. [Create React App](https://create-react-app.dev/) (`react-scripts` 5) 기반입니다.

## 환경 변수

**필요 없음.** API 키·백엔드 URL 등 외부 설정 없이 `yarn start` / `yarn build`만으로 동작합니다. 정적 콘텐츠·3D 모델은 `public/`·`src/data/`에 포함됩니다.

## 검증

```bash
yarn install
yarn build                    # production 빌드 (CI·Vercel과 동일)
yarn test --watchAll=false    # Jest 1회 실행
yarn format:check             # Prettier 검사
```

## 제약

<!-- prettier-ignore-start -->
| 항목 | 내용 |
|---|---|
| **CRA** | `react-scripts` 5 — eject 없이 webpack 설정 변경 불가 |
| **Node** | 18+ 권장 (`engines` 미고정, 로컬·Vercel Node 18 호환) |
| **모바일 3D** | `BodyBackground`·`BodyScene`은 **데스크톱만** 렌더 (`useResponsive` mobile 분기) |
| **reduced motion** | `prefers-reduced-motion: reduce`이면 3D 배경·섹션 스냅 스크롤 애니메이션 비활성 |
| **라우트** | `/`, `/test`만 메인 레이아웃. 그 외는 404 전용 레이아웃 (사이드바·3D 없음) |
<!-- prettier-ignore-end -->

## 스크립트

```bash
yarn start          # 개발 서버 (포트 3000)
yarn build          # production 빌드
yarn test           # Jest + Testing Library (watch 모드)
yarn test --watchAll=false   # CI용 1회 실행
yarn format         # Prettier 전체 포맷
yarn format:check   # Prettier 검사만
```

## 페이지·라우트

| 경로    | 설명                                                 |
| ------- | ---------------------------------------------------- |
| `/`     | 메인 — 히어로, 소개, 스킬 차트, 프로젝트 카드 (14개) |
| `/test` | UI 컴포넌트 데모 (Button, Input, CardGallery 등)     |
| `*`     | 404 (`src/page/404.tsx`)                             |

라우팅은 `src/App.tsx` → `app/AppShell.tsx`의 `react-router-dom` Routes에서 처리합니다.

### 메인(`/`) 섹션 구조

`constants/layout.ts`의 `SECTION_BASE = 3`(히어로·소개·스킬) + `data/projects.tsx` 항목 수만큼 풀페이지 섹션이 이어집니다.

| 섹션 | 컴포넌트                         | 내용                               |
| ---- | -------------------------------- | ---------------------------------- |
| 0    | `HomeHeroCard` + `HeroWireframe` | 타이핑 히어로, wireframe 3D        |
| 1    | `IntroSection`                   | 자기소개 (`data/introContent.tsx`) |
| 2    | `SkillInsight`                   | 레이더 차트 (`data/skillRadar.ts`) |
| 3…   | `ProjectCard` × 14               | 프로젝트별 경력·스택·링크          |

데스크톱: 휠·키보드(↑↓)로 섹션 스냅 이동, `PageIndicator`로 점프. 모바일: 사이드바 높이를 고려한 스크롤 오프셋(`useSectionNavigation`). 하단 `GlobalScrollHint`로 다음 섹션 안내.

## 테마

- `contexts/ThemeContext.tsx` — `isDarkMode` 상태
- `data/themes.ts` — `lightTheme` / `darkTheme` (styled-components theme)
- `themeContext.storage.ts` — `localStorage`에 선택 저장
- 사이드바 테마 토글 (`component/sider/sider.tsx`)

기본값은 다크 모드입니다.

## 3D·배경

| 컴포넌트        | 위치                     | 조건                                                   |
| --------------- | ------------------------ | ------------------------------------------------------ |
| `BodyScene`     | `app/BodyBackground.tsx` | 데스크톱, `/`·`/test`만, `prefers-reduced-motion` 아님 |
| `HeroWireframe` | 히어로 카드 내부         | wireframe Canvas                                       |
| `MacbookModel`  | BodyScene                | GLB (`public/models/`)                                 |

Three.js + `@react-three/fiber` + `@react-three/drei`. 상수는 `constants/three/`에 분리합니다.

## 사이드바

`component/sider/sider.tsx` — 프로필(`data/profile.ts`), 장점 아이콘, 기술 스택·경력(`data/siderTech.tsx`), 학력, 테마 토글. 데스크톱·태블릿 레일(`SIDER_RAIL = 300px`), 모바일은 상단 블록으로 재배치됩니다.

## 데이터 수정

| 파일                    | 내용                                |
| ----------------------- | ----------------------------------- |
| `data/profile.ts`       | 이름, 연락처, 학력, 장점            |
| `data/projects.tsx`     | 프로젝트 14개 (주석 처리 블록 유지) |
| `data/skillRadar.ts`    | 스킬 레이더 값·통계                 |
| `data/themes.ts`        | 색·간격 테마 토큰                   |
| `data/siderTech.tsx`    | 사이드바 기술·경력 그룹             |
| `data/introContent.tsx` | 소개 섹션 카피                      |
| `data/heroTyping.ts`    | 히어로 타이핑 steps                 |

## 스택

React 18 · TypeScript 5.6 · styled-components · framer-motion · Three.js (`@react-three/fiber`, `@react-three/drei`) · react-router-dom 6 · anime.js · react-typical · Vercel Analytics

## 폴더 구조

```
src/
├── app/           AppShell, BodyBackground (전역 3D)
├── page/          메인·404·UI 데모, sections/, navigation/
├── component/     ui/, sider/, hero/, background/, charts/, CardGallery …
├── hooks/         useResponsive, useSectionNavigation, useSidebarHeight
├── data/          프로필, 프로젝트, 테마, 정적 콘텐츠
├── constants/     layout, animations, three/
├── types/         도메인·components props
├── contexts/      ThemeContext
└── styled/        GlobalStyle, theme re-export
```

import는 `tsconfig.json` `baseUrl: "src"` 절대 경로를 사용합니다. 상세 규칙은 [CONVENTIONS.md](./CONVENTIONS.md)를 참고하세요.

## 문서

- [아키텍처](docs/ARCHITECTURE.md) — 라우팅, 섹션 네비게이션, 3D·테마, 빌드
- [CONVENTIONS.md](./CONVENTIONS.md) — 포맷, import, 파일 네이밍

## 배포

Vercel에 연결되어 있습니다. `main` 브랜치 push 시 `yarn build`로 자동 배포됩니다. CRA 기본 SPA 라우팅이 적용되어 `/test` 등 클라이언트 경로가 그대로 동작합니다.

## 3D 모델 attribution

`public/models/ATTRIBUTION.txt` 참고.
