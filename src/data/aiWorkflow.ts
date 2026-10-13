export type AiWorkflowUsage = {
  label: string;
  text: string;
};

export type AiWorkflowContent = {
  title: string;
  pill: string;
  lead: string;
  usage: AiWorkflowUsage[];
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
  productivity: [
    '분석·구현·리뷰를 병렬로 진행해 대형 컴포넌트 분리를 빠르고 안전하게 끝냈습니다.',
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
