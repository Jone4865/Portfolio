import type { ReactNode } from 'react';

export type ProjectLink = {
  url: string;
  name: string;
};

export type StackItem = {
  name: string;
  icon: ReactNode;
};

export type Project = {
  key: string;
  date: string;
  title: string;
  subTitle: string;
  stack: StackItem[];
  people: string;
  experience: string[];
  link?: ProjectLink[];
};

/** @deprecated Use Project */
export type Data = Project;
