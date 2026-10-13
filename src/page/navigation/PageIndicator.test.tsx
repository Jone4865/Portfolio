import { fireEvent, render, screen } from '@testing-library/react';

import { CustomThemeProvider } from 'contexts';

import PageIndicator from './PageIndicator';

describe('PageIndicator', () => {
  it('renders section dots as buttons with aria-current on the active section', () => {
    const onGoToSection = jest.fn();
    render(
      <CustomThemeProvider>
        <PageIndicator
          isDesktop
          isTablet={false}
          activeSection={1}
          projectCount={2}
          onGoToSection={onGoToSection}
        />
      </CustomThemeProvider>,
    );

    expect(screen.getByRole('button', { name: 'Intro 섹션으로 이동' })).toHaveAttribute(
      'aria-current',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Home 섹션으로 이동' })).not.toHaveAttribute(
      'aria-current',
    );
  });

  it('navigates to the selected section when a dot is clicked', () => {
    const onGoToSection = jest.fn();
    render(
      <CustomThemeProvider>
        <PageIndicator
          isDesktop
          isTablet={false}
          activeSection={0}
          projectCount={1}
          onGoToSection={onGoToSection}
        />
      </CustomThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: '프로젝트 1 섹션으로 이동' }));
    expect(onGoToSection).toHaveBeenCalledWith(2);
  });

  it('places the earlier-work and AI dots after the project dots', () => {
    const onGoToSection = jest.fn();
    render(
      <CustomThemeProvider>
        <PageIndicator
          isDesktop
          isTablet={false}
          activeSection={5}
          projectCount={2}
          onGoToSection={onGoToSection}
        />
      </CustomThemeProvider>,
    );

    expect(screen.queryByRole('button', { name: /Skills/ })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '그 전의 작업 섹션으로 이동' }));
    expect(onGoToSection).toHaveBeenCalledWith(4);
    expect(
      screen.getByRole('button', { name: 'AI와 함께 일하는 방식 섹션으로 이동' }),
    ).toHaveAttribute('aria-current', 'true');
  });
});
