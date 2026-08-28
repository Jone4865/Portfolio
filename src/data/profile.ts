export const profile = {
  name: '채종원',
  role: 'Frontend Developer',
  birthAndAddress: '1994.03.30 / 서울 성북구 돈암2동',
  email: 'cowhddnjsdl0@naver.com',
  phone: '010-5705-4865',
  phoneTel: 'tel:010-5705-4865',
  merits: [
    { key: 'communication', label: '의사소통' },
    { key: 'calm', label: '차분함' },
    { key: 'challenge', label: '도전정신' },
    { key: 'detail', label: '꼼꼼함' },
  ] as const,
  education: [
    {
      school: '홍익사범대학부속고등학교',
      period: '2010.03 ~ 2013.02',
    },
    {
      school: '한국방송통신대학교',
      period: '2022.03 ~ 재학중(컴퓨터과학과)',
    },
  ],
};
