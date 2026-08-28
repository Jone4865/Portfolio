import styled from 'styled-components';

import type { InputWithIconProps } from './inputWithIcon.types';

export const FieldShell = styled.div<InputWithIconProps>`
  display: flex;
  border-radius: 10px;
  border: solid 1px ${({ error }) => (error ? '#F84D61' : '#e8e5e5')};

  &:hover {
    border: solid 1px ${({ disabled }) => (disabled ? 'none' : '#009ade')};
    cursor: ${({ disabled, buttonPointer }) =>
      disabled ? 'not-allowed' : buttonPointer ? 'pointer' : 'default'};
  }
`;

export const FieldInput = styled.input<InputWithIconProps>`
  border: none;
  outline: none;
  width: 100%;
  padding: 10px 0 10px 20px;
  border-radius: 10px 0 0 10px;
  background-color: ${({ disabled }) => (disabled ? '#e8e5e5' : undefined)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : undefined)};
`;

export const IconSlot = styled.div<InputWithIconProps>`
  white-space: nowrap;
  border-radius: 0 10px 10px 0;
  padding: 10px 20px 10px 0;
  background-color: ${({ disabled }) => (disabled ? '#e8e5e5' : undefined)};
  color: ${({ disabled }) => (disabled ? '#817d7d' : '#333')};
`;
