# Portfolio 아키텍처

## 앱 셸

```
App.tsx
└── BrowserRouter
    └── AppShell
        ├── CustomThemeProvider (ThemeContext + styled-components ThemeProvider)
        ├── GlobalStyle
        ├── BodyBackground → BodyScene (조건부 3D)
        ├── Sider (404 제외)
        ├── Routes
        │   ├── /        → PageIndex
        │   ├── /test    → PageCommonComponent
        │   └── *        → NotFoundPage
        └── Vercel Analytics
```

`AppShell.tsx`가 라우트별 레이아웃 분기를 담당합니다. `/`와 `/test`만 사이드바·3D 배경을 표시하고, 그 외 경로는 404 전용 레이아웃입니다.

## 메인 페이지 섹션 모델

`page/index.tsx`가 단일 긴 스크롤 컨테이너를 렌더합니다.

### 섹션 인덱스

```
activeSection:
  0           → HomeHeroCard (히어로)
  1           → IntroSection
  2           → SkillInsight
  3 … 2+N     → ProjectCard (projects[N-3])
```

- `SECTION_BASE = 3` (`constants/layout.ts`)
- `projects.length = 14` (`data/projects.tsx`)
- 최대 섹션: `2 + projectCount` (= 16)

### 네비게이션 (`hooks/useSectionNavigation.ts`)

| 입력               | 동작                                                  |
| ------------------ | ----------------------------------------------------- |
| 휠                 | 섹션 단위 스냅 (programmatic scroll flag로 루프 방지) |
| ↑ / ↓              | `goToSection(active ± 1)`                             |
| PageIndicator 클릭 | 해당 섹션으로 이동                                    |
| GlobalScrollHint   | 다음 섹션                                             |

**데스크톱:** `scrollY / innerHeight`로 activeSection 계산.

**모바일:** 사이드바 높이(`useSidebarHeight`) + 100px intro threshold 후 섹션 높이(100vh) 단위 계산. Wrap 높이를 `calc((SECTION_BASE + projectCount) * 100vh + offset)`으로 명시.

`prefers-reduced-motion: reduce`이면 커스텀 애니메이션 대신 즉시 `scrollTo`.

### 진행 표시

- `useScroll()` → `scrollYProgress` → 상단 `PrograssStyle` scaleX 바
- `PageIndicator` — 데스크톱만, `data/pageIndicator.ts` 섹션 라벨

## 테마 시스템

```
ThemeContext (isDarkMode, toggleTheme)
    │
    ├── themeContext.storage — localStorage read/write
    │
    └── styled-components ThemeProvider
            ├── lightTheme / darkTheme (data/themes.ts)
            └── GlobalStyle (styled/globalStyles.ts)
```

컴포넌트는 `useTheme()` 또는 `ThemeContext`로 색·간격 토큰에 접근합니다. 3D `BodyScene`은 `theme.accent`를 props로 받아 accent mesh 색에 반영합니다.

## 3D 레이어

### BodyScene (전역 배경)

- **파일:** `component/background/BodyScene.tsx`, `SceneContent.tsx`, `MacbookModel.tsx`
- **마운트:** `BodyBackground.tsx`
- **조건:** `!is404Page && !reduceMotion && !isMobile`
- **로딩:** `React.lazy` + `Suspense`
- **카메라·조명:** `constants/three/bodyScene.ts`

### HeroWireframe (히어로 카드)

- **파일:** `component/hero/HeroWireframe.tsx`, `HeroWireScene.tsx`, `AccentMesh.tsx`
- **역할:** 히어로 카드 우측 wireframe Canvas
- **상수:** `constants/three/heroWireframe.ts`

모델 GLB는 `public/models/`에 두며 attribution은 `ATTRIBUTION.txt`에 기록합니다.

## UI 컴포넌트 (`/test`)

`page/pageCommonComponent.tsx` — `component/ui/` 아래 Button, Input, CheckBox, Radio, TextArea, InputWithIcon, CardGallery, CardExpand 데모. 반응형은 `useResponsive`로 분기합니다.

## 반응형

`hooks/useResponsive.tsx` — `react-responsive` 미디어 쿼리로 `isDesktop` / `isTablet` / `isMobile` 제공.

레이아웃 상수:

- `SIDER_RAIL = 300` — 사이드바 고정 너비
- 페이지·섹션 스타일 — `page/styles/pageLayout.styles.ts`

## 데이터·타입 분리

| 계층           | 역할                                       |
| -------------- | ------------------------------------------ |
| `data/*.ts(x)` | 정적 콘텐츠, JSX 아이콘 포함 프로젝트 목록 |
| `types/`       | `Project`, `AppTheme`, 컴포넌트 props      |
| `constants/`   | 애니메이션 preset, Three.js, layout 수치   |
| `*.styles.ts`  | styled-components 정의 (컴포넌트와 분리)   |

프로젝트 카드 키: `` `${project.title}-${project.date}` `` (동일 `key` 필드가 있어도 title+date로 구분).

## 빌드·테스트

| 명령                         | 설명                                           |
| ---------------------------- | ---------------------------------------------- |
| `yarn build`                 | `react-scripts build` — TypeScript 검사 + 번들 |
| `yarn test --watchAll=false` | Jest, `src/App.test.tsx` 등                    |
| `yarn format:check`          | Prettier                                       |

`tsconfig.json`: `baseUrl: "src"`, strict mode. path alias 없이 폴더명 직접 import (`hooks`, `data/projects`).

## 배포 (Vercel)

- Build command: `yarn build` (또는 `npm run build`)
- Output: `build/`
- SPA: CRA 기본 — 모든 경로가 `index.html` fallback
- Analytics: `@vercel/analytics/react` in `AppShell`

## 확장 시 참고

- **프로젝트 추가:** `data/projects.tsx` 배열에 항목 추가 → 섹션 수 자동 반영 (`useSectionNavigation`의 `projectCount`)
- **스킬 수정:** `data/skillRadar.ts`, `SkillInsight.tsx`
- **테마 색:** `data/themes.ts`만 수정하면 styled-components 전역 반영
