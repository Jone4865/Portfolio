import type { ButtonProps } from './button.types';
import { ButtonRoot } from './button.styles';

export default function Button({
  children,
  width,
  buttonType = 'solid',
  ...rest
}: ButtonProps) {
  return (
    <ButtonRoot width={width} buttonType={buttonType} {...rest}>
      {children}
    </ButtonRoot>
  );
}
