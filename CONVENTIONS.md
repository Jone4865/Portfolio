# 코드 컨벤션

이 프로젝트에서 쓰는 규칙 정리. Prettier 설정(`.prettierrc`)과 맞춰 두었습니다.

## 포맷

- 세미콜론 사용, 작은따옴표, trailing comma
- 들여쓰기 2칸, 줄바꿈 LF
- 한 줄 100자 (`printWidth: 100`)
- 커밋 전 `yarn format` 또는 에디터 format on save 권장

## import

`tsconfig.json`의 `baseUrl: "src"` 기준 **절대 경로**를 씁니다.

```ts
import { useResponsive } from 'hooks';
import { projects } from 'data/projects';
import type { Project } from 'types/project';
import Button from 'component/ui/button';
```

상대 경로(`../`)는 **같은 기능 묶음 안**에서만 허용합니다. 예: `page/sections/` → `../styles/pageLayout.styles`.

import 순서:

1. 외부 패키지 (`react`, `framer-motion` 등)
2. `src` 절대 경로 (`hooks`, `data`, `types`, `component`, `constants` …)
3. 같은 폴더/상위 폴더 상대 경로
4. 그룹 사이 빈 줄 한 줄

타입만 가져올 때는 `import type`을 씁니다.

## 폴더 역할

| 경로         | 넣을 것                                                |
| ------------ | ------------------------------------------------------ |
| `app/`       | 라우터 바깥 앱 셸, 전역 배경                           |
| `page/`      | 라우트 단위 페이지, 페이지 전용 스타일·애니메이션      |
| `component/` | 재사용 UI·차트·3D·사이드바                             |
| `hooks/`     | 커스텀 훅                                              |
| `data/`      | 프로필, 프로젝트, 테마 객체, JSX 포함 정적 콘텐츠      |
| `constants/` | 레이아웃 수치, 애니메이션 preset, Three.js 상수        |
| `types/`     | 타입·인터페이스 (`types/components/`에 컴포넌트 props) |
| `contexts/`  | React Context                                          |
| `styled/`    | GlobalStyle, styled-components 테마 re-export          |

**컴포넌트 파일에는 로직만.** 아래는 분리합니다.

- 스타일 → `*.styles.ts` (styled-components)
- props 타입 → `*.types.ts` 또는 `types/components/*.ts`
- 이미지 URL, 카피, steps 배열 → `data/` 또는 `constants/`

## 파일·이름

### UI 컴포넌트 (`component/ui/`)

```
button/
├── Button.tsx          # 컴포넌트 (PascalCase)
├── button.styles.ts    # styled-components
├── button.types.ts     # props 타입
└── index.ts            # barrel export
```

### 기능 컴포넌트 (`component/CardExpand/` 등)

동일 패턴. 스타일 파일명은 `cardExpand.styles.ts`처럼 **camelCase + `.styles.ts`**.

### 페이지

```
page/
├── index.tsx
├── styles/pageLayout.styles.ts
├── animations/pageCommonVariants.ts
└── sections/IntroSection.tsx
```

페이지·섹션 컴포넌트는 **default export**. 파일명은 PascalCase.

### 훅

- 파일명: `useSectionNavigation.ts`
- 이름: `use` 접두사
- `hooks/index.ts`에서 re-export

### 타입

- 도메인: `types/project.ts`, `types/section.ts`
- 컴포넌트 props: `types/components/projectCard.ts`
- export 이름: `ProjectCardProps`, `AppTheme` 등 PascalCase

### 상수

- 변경 없는 설정값: `UPPER_SNAKE` (`SIDER_RAIL`, `SECTION_BASE`)
- 객체·배열 preset: camelCase (`heroHoverSpring`, `pageIndicatorSections`)

## styled-components

- styled 컴포넌트는 `*.styles.ts`에만 정의
- DOM에 넘기지 않을 prop은 transient prop (`$image`, `$tall`)
- 테마 색·간격은 `theme` 객체(`data/themes.ts`)에서 참조

## React

- 함수 컴포넌트 + TypeScript. 클래스 컴포넌트 사용 안 함
- props 타입은 별도 파일에 두고 컴포넌트에서 import
- `React.FC` 대신 `(props: XxxProps) => …` 형태
- lazy 로드가 필요한 무거운 컴포넌트만 `React.lazy` (예: Three.js 씬)

## 데이터 수정 시

- 프로필·연락처: `data/profile.ts`
- 프로젝트 목록: `data/projects.tsx` (주석 처리된 프로젝트 블록 유지)
- 라이트/다크 테마: `data/themes.ts`
- 사이드바 기술 스택: `data/siderTech.tsx`

## 금지·지양

- `src` 밖 모듈을 `../../hooks/...`처럼 깊은 상대 경로로 import
- `.tsx` 안에 `styled.div` 인라인 정의
- `.tsx` 안에 props `interface` / `type` 정의 (작은 로컬 타입 제외)
- 매직 넘버를 컴포넌트에 직접 — `constants/`로 빼기

## 스크립트

```bash
yarn format       # 전체 포맷
yarn format:check # CI/PR 전 확인
yarn build        # 타입·빌드 검증
```
