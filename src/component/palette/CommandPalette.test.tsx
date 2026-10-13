import { act, fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';

import { CustomThemeProvider } from 'contexts';

import CommandPalette from './CommandPalette';
import type { PaletteItem } from './CommandPalette';

function Harness({ items }: { items: PaletteItem[] }) {
  const [open, setOpen] = useState(false);
  return (
    <CustomThemeProvider>
      <CommandPalette open={open} onOpenChange={setOpen} items={items} />
    </CustomThemeProvider>
  );
}

const make = (title: string, run = jest.fn()): PaletteItem => ({
  id: title,
  group: '프로젝트',
  title,
  sub: '',
  icon: title[0],
  hint: '',
  kw: '',
  run,
});

describe('CommandPalette', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('opens with Ctrl+K, filters by choseong and runs the chosen item on Enter', () => {
    const run = jest.fn();
    render(<Harness items={[make('HR System'), make('방배사', run)]} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    expect(screen.getByRole('dialog', { name: '명령 팔레트' })).toBeInTheDocument();

    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'ㅂㅂㅅ' } });
    expect(screen.getAllByRole('option')).toHaveLength(1);

    fireEvent.keyDown(input, { key: 'Enter' });
    act(() => {
      jest.runAllTimers();
    });
    expect(run).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes with Escape', () => {
    render(<Harness items={[make('HR System')]} />);
    fireEvent.keyDown(window, { key: 'k', metaKey: true });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
