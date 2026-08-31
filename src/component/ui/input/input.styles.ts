import styled from 'styled-components';

import type { InputProps } from './input.types';

export const InputRoot = styled.input<InputProps>`
  padding: 12px 18px;
  border-radius: 12px;
  font-size: 15px;
  font-family: inherit;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  width: ${({ width }) => (width ? `${width}px` : 'auto')};
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ error, theme }) => (error ? theme.accent : theme.inputBorder)};

  &::placeholder {
    color: ${({ theme }) => theme.textMuted};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.inputDisabledBg};
    color: ${({ theme }) => theme.textMuted};
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.inputBorderHover};
  }

  &:focus:not(:disabled) {
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.accentMuted};
  }
`;
