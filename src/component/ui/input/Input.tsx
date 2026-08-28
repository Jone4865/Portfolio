import type { InputProps } from './input.types';
import { InputRoot } from './input.styles';

export default function Input({ width, error, ...rest }: InputProps) {
  return <InputRoot error={error} width={width} {...rest} />;
}
