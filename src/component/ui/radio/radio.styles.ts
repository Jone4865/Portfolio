import styled from 'styled-components';

import type { RadioStyleProps } from './radio.types';

export const Label = styled.label<RadioStyleProps>`
  display: inline-block;
  position: relative;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  cursor: pointer;
`;

export const HiddenRadioButton = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  pointer-events: none;
`;

export const CustomRadioButton = styled.div<RadioStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  background-color: white;
  border: ${({ error }) => (error ? '1px solid #F84D61' : '1px solid #e8e5e5')};
  border-radius: 50%;
  transition: all 0.3s;

  ${HiddenRadioButton}:checked + & {
    background-color: #009ade;
    border-color: #009ade;
  }

  ${HiddenRadioButton}:checked + &::after {
    content: '';
    display: block;
    width: 50%;
    height: 50%;
    background-color: white;
    border-radius: 50%;
    position: absolute;
  }

  ${HiddenRadioButton}:disabled + & {
    background-color: #e8e5e5;
    border-color: #d1d1d1;
    cursor: not-allowed;
  }

  &:hover {
    border-color: #009ade;
  }
`;
