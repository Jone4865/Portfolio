import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AppShell from 'app/AppShell';
import { projects } from 'data/projects';
import { profile } from 'data/profile';

function renderApp(initialEntry = '/') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <AppShell />
    </MemoryRouter>,
  );
}

describe('AppShell smoke tests', () => {
  it('renders the home page with profile and hero content', () => {
    renderApp('/');

    expect(screen.getByRole('link', { name: '본문 바로가기' })).toHaveAttribute(
      'href',
      '#main-content',
    );
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText(profile.name)).toBeInTheDocument();
    expect(screen.getByTestId('hero-typing')).toBeInTheDocument();
  });

  it('renders the 404 page for unknown routes', () => {
    renderApp('/missing-page');

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('페이지를 찾을 수 없습니다')).toBeInTheDocument();
  });

  it('renders active project cards on the home page', () => {
    renderApp('/');

    projects.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });
  });
});
