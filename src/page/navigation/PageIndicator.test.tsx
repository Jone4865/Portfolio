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

    fireEvent.click(screen.getByRole('button', { name: 'Skills 섹션으로 이동' }));
    expect(onGoToSection).toHaveBeenCalledWith(2);
  });
});
