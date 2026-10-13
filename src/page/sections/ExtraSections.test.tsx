import { fireEvent, render, screen, within } from '@testing-library/react';

import { CustomThemeProvider } from 'contexts';
import { aiWorkflow } from 'data/aiWorkflow';
import { earlierProjects } from 'data/projects';

import AiWorkflowSection from './AiWorkflowSection';
import EarlierWorkSection, { EARLIER_VISIBLE_COUNT } from './EarlierWorkSection';

const layout = { isActive: true, isDesktop: true, isTablet: false, isMobile: false };

describe('AiWorkflowSection', () => {
  it('renders the headings, productivity, principles and the Jone Lab link in a new tab', () => {
    render(
      <CustomThemeProvider>
        <AiWorkflowSection {...layout} />
      </CustomThemeProvider>,
    );

    expect(screen.getByRole('region', { name: 'AI와 함께 일하는 방식' })).toBeInTheDocument();
    aiWorkflow.productivity.forEach((item) => expect(screen.getByText(item)).toBeInTheDocument());
    aiWorkflow.principles.forEach((item) => expect(screen.getByText(item)).toBeInTheDocument());

    const link = screen.getByRole('link', { name: /Jone Lab 보러 가기/ });
    expect(link).toHaveAttribute('href', 'https://jone-lab.pages.dev');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });
});

describe('EarlierWorkSection', () => {
  it('lists only the earlier projects (excluding 덜지니어스 / 20-Questions)', () => {
    const titles = earlierProjects.map((p) => p.title);
    expect(titles).toEqual([
      '자사 쇼핑몰 CMS 템플릿',
      '리얼파이 CMS',
      '로디언즈 홀딩스',
      '리얼파이 랜딩페이지',
      '감동기획 랜딩페이지',
      '방배사 랜딩페이지',
    ]);
  });

  it('folds the rest behind "더 보기"', () => {
    render(
      <CustomThemeProvider>
        <EarlierWorkSection {...layout} />
      </CustomThemeProvider>,
    );

    const list = screen.getByRole('list');
    expect(within(list).getAllByRole('listitem')).toHaveLength(EARLIER_VISIBLE_COUNT);

    const more = screen.getByRole('button', { name: /더 보기/ });
    expect(more).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(more);

    expect(within(list).getAllByRole('listitem')).toHaveLength(earlierProjects.length);
    expect(screen.getByRole('button', { name: '접기' })).toHaveAttribute('aria-expanded', 'true');
  });
});
