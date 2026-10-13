export type AiWorkflowUsage = {
  label: string;
  text: string;
};

export type AiWorkflowCase = {
  title: string;
  summary: string;
  points: string[];
};

export type AiWorkflowContent = {
  title: string;
  pill: string;
  lead: string;
  usage: AiWorkflowUsage[];
  cases: AiWorkflowCase[];
  productivity: string[];
  principles: string[];
  closing: string;
  link: { name: string; url: string };
};

export const aiWorkflow: AiWorkflowContent = {
  title: 'AI와 함께 일하는 방식',
  pill: 'AI Workflow',
  lead: 'AI를 코드 자동완성이 아니라 함께 일하는 프론트엔드 팀원으로 씁니다. 화면 설계, 동작 기준, 검증 방법은 제가 정하고, 컴포넌트 분석·구현·테스트 작성·회귀 검토는 AI와 나눠서 진행합니다.',
  usage: [
    {
      label: 'Cursor',
      text: '대형 Vue 프로젝트에서 컴포넌트·스토어·컴포저블 사이의 데이터 흐름을 추적하게 하고, 수정 범위를 정해 구현을 맡긴 뒤 빌드와 테스트로 확인합니다.',
    },
    {
      label: 'Claude Code · Codex',
      text: '반복 리팩터링과 하위 작업을 병렬로 처리하고, 분석·구현·리뷰 담당을 나눠 맡깁니다.',
    },
    {
      label: '규칙을 먼저 정합니다',
      text: '저장소에 AI 작업 규칙과 TDD·테스트 훅(테스트 먼저 작성, 기존 문구·스타일·동작 변경 금지, 빌드 통과 후 커밋)을 두어 어떤 AI가 작업해도 같은 기준을 지킵니다. AI가 고친 결과는 "왜 이렇게 고쳤는지"를 코드 근거로 설명하게 하고, 확인한 뒤 반영합니다.',
    },
  ],
  cases: [
    {
      title: '대형 Vue 컴포넌트 리팩터링',
      summary: '1,000줄이 넘는 컴포넌트와 컴포저블을 동작 변경 없이 나눴습니다.',
      points: [
        'AI 채팅 위젯은 메시지 목록을 자식 컴포넌트로 분리했습니다. 소켓·드래그·리사이즈·상태는 부모가 맡고, 자식은 props/emit만 사용합니다.',
        '분리 전에 Vitest로 기존 동작을 먼저 고정했습니다.',
        '대시보드 차트 옵션 생성기는 별도 모듈로 옮기고, 기존 import 경로는 re-export로 유지했습니다.',
        '마지막에는 별도 AI가 공유 상태 섞임·얕은 복사·날짜/금액 포맷 회귀만 검토했습니다.',
      ],
    },
    {
      title: 'AI 챗봇 → 실제 화면 이동',
      summary: '검색어만 넘기던 구조를 구조화된 페이지 요청으로 바꿨습니다.',
      points: [
        '탭·필터·정렬까지 그대로 적용된 화면으로 이동합니다.',
        '각 화면의 기존 필터 적용 경로를 재사용했습니다.',
        '실패하면 기존 방식으로 자동 전환됩니다.',
      ],
    },
    {
      title: '실수 방지 UX',
      summary:
        '계약·정산 다이얼로그에서 이미 정산된 회차 금액을 0으로 바꿔 저장할 때만 경고합니다.',
      points: [
        '"확인했습니다"를 입력한 뒤에만 저장됩니다.',
        '원본 스냅샷과 편집 데이터를 안정적인 키로 비교합니다.',
      ],
    },
    {
      title: '원인부터 고치기',
      summary: '증상이 아니라 데이터 흐름을 추적해 원인을 찾아 고칩니다.',
      points: [
        '차기 계약 생성 시 이전 계약의 도입시기가 덮어써지던 버그를 다이얼로그 상태 → 변환 함수 → 저장 DTO 흐름으로 추적해 원인이 된 한 줄을 고쳤고, 잘못 저장된 데이터는 이력으로 복구했습니다.',
        'UI 라이브러리 호환 레이어 때문에 깨진 탭 스타일도 실제 DOM·class·CSS import 경로를 추적해 고쳤습니다.',
      ],
    },
  ],
  productivity: [
    '분석·구현·리뷰를 병렬로 진행해 대형 컴포넌트 분리를 빠르고 안전하게 끝냈습니다.',
    '1,000줄이 넘는 파일을 책임별로 나눠 읽고 고치기 쉬워졌습니다.',
    '"화면 값이 이상해요" 문의는 화면·코드·데이터 흐름 조사를 AI에 동시에 맡겨, 원인 파악부터 배포까지 당일에 끝냅니다.',
    'AI 작업 기준을 저장소에 공유해 팀원 누가 AI를 써도 같은 품질 기준을 지킵니다.',
    '프론트에서 원인이 보이지 않으면 API와 데이터까지 추적해 원인을 좁힌 뒤 백엔드에 전달합니다.',
  ],
  principles: [
    '설계와 판단은 제가, 반복 구현은 AI가 맡습니다.',
    '테스트 없이 바꾸지 않습니다.',
    'AI 결과는 근거까지 확인합니다.',
  ],
  closing: '회사 밖에서도 AI와 함께 필요한 서비스를 기획부터 배포까지 직접 만들고 있습니다.',
  link: { name: 'Jone Lab 보러 가기', url: 'https://jone-lab.vercel.app' },
};
