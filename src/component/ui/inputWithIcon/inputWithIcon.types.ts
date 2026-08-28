import type { ReactNode } from 'react';

export type InputWithIconProps = React.InputHTMLAttributes<HTMLInputElement> & {
  width?: number;
  error?: boolean;
  disabled?: boolean;
  buttonIcon?: ReactNode;
  buttonWitdh?: number;
  buttonPointer?: boolean;
};
