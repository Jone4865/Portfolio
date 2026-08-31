import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CustomThemeProvider } from 'contexts';

import GlobalScrollHint from './GlobalScrollHint';

describe('GlobalScrollHint', () => {
  it('renders as a button with an accessible label', () => {
    render(
      <CustomThemeProvider>
        <GlobalScrollHint isMobile onNext={jest.fn()} />
      </CustomThemeProvider>,
    );

    expect(screen.getByRole('button', { name: '다음 섹션으로 이동' })).toBeInTheDocument();
  });

  it('calls onNext when clicked', async () => {
    const user = userEvent.setup();
    const onNext = jest.fn();
    render(
      <CustomThemeProvider>
        <GlobalScrollHint isMobile onNext={onNext} />
      </CustomThemeProvider>,
    );

    await user.click(screen.getByRole('button', { name: '다음 섹션으로 이동' }));
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('calls onNext when activated with Enter', async () => {
    const user = userEvent.setup();
    const onNext = jest.fn();
    render(
      <CustomThemeProvider>
        <GlobalScrollHint isMobile onNext={onNext} />
      </CustomThemeProvider>,
    );

    const button = screen.getByRole('button', { name: '다음 섹션으로 이동' });
    button.focus();
    await user.keyboard('{Enter}');
    expect(onNext).toHaveBeenCalledTimes(1);
  });
});
