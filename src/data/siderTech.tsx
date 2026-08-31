import type { ReactNode } from 'react';
import { FaEdit, FaAws, FaGithub, FaSourcetree, FaFigma, FaReact } from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTypescript,
  SiVuedotjs,
  SiVite,
  SiSass,
  SiStyledcomponents,
  SiTailwindcss,
  SiAntdesign,
  SiApollographql,
  SiSocketdotio,
  SiAxios,
  SiMui,
  SiReactquery,
  SiReacthookform,
  SiRecoil,
  SiStorybook,
  SiNestjs,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiFlutter,
  SiVercel,
  SiAmazons3,
  SiXcode,
  SiAndroidstudio,
  SiVisualstudio,
  SiAdobexd,
} from 'react-icons/si';
import { TbBrandRedux, TbBrandReactNative } from 'react-icons/tb';

export type TechItem = {
  name: string;
  icon: ReactNode;
};

export type TechGroup = {
  label: string;
  items: TechItem[];
};

export const techGroups: TechGroup[] = [
  {
    label: 'Language',
    items: [{ name: 'TypeScript', icon: <SiTypescript /> }],
  },
  {
    label: 'Framework',
    items: [
      { name: 'React', icon: <FaReact /> },
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'Vue 3', icon: <SiVuedotjs /> },
      { name: 'Vite', icon: <SiVite /> },
    ],
  },
  {
    label: 'Data / State',
    items: [
      { name: 'React Query', icon: <SiReactquery /> },
      { name: 'Apollo GraphQL', icon: <SiApollographql /> },
      { name: 'Axios', icon: <SiAxios /> },
      { name: 'Recoil', icon: <SiRecoil /> },
      { name: 'React Hook Form', icon: <SiReacthookform /> },
    ],
  },
  {
    label: 'Styling / UI',
    items: [
      { name: 'styled-components', icon: <SiStyledcomponents /> },
      { name: 'Sass / SCSS', icon: <SiSass /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
      { name: 'Ant Design', icon: <SiAntdesign /> },
      { name: 'MUI', icon: <SiMui /> },
      { name: 'Naive UI', icon: <SiVuedotjs /> },
      { name: 'Toast UI Editor', icon: <FaEdit /> },
    ],
  },
];

export const experienceGroups: TechGroup[] = [
  {
    label: 'Realtime / Cloud',
    items: [
      { name: 'Socket.IO', icon: <SiSocketdotio /> },
      { name: 'AWS', icon: <FaAws /> },
      { name: 'Vercel', icon: <SiVercel /> },
      { name: 'Amazon S3', icon: <SiAmazons3 /> },
    ],
  },
  {
    label: 'Mobile',
    items: [
      { name: 'React Native', icon: <TbBrandReactNative /> },
      { name: 'Flutter', icon: <SiFlutter /> },
      { name: 'Xcode', icon: <SiXcode /> },
      { name: 'Android Studio', icon: <SiAndroidstudio /> },
    ],
  },
  {
    label: 'State / Docs',
    items: [
      { name: 'Redux Toolkit', icon: <TbBrandRedux /> },
      { name: 'Storybook', icon: <SiStorybook /> },
    ],
  },
  {
    label: 'Tools',
    items: [
      { name: 'Visual Studio', icon: <SiVisualstudio /> },
      { name: 'GitHub', icon: <FaGithub /> },
      { name: 'Sourcetree', icon: <FaSourcetree /> },
      { name: 'Figma', icon: <FaFigma /> },
      { name: 'Adobe XD', icon: <SiAdobexd /> },
    ],
  },
  {
    label: 'Backend',
    items: [
      { name: 'NestJS', icon: <SiNestjs /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
      { name: 'MySQL', icon: <SiMysql /> },
      { name: 'Redis', icon: <SiRedis /> },
    ],
  },
];
