import type { RadioProps } from './radio.types';
import { CustomRadioButton, HiddenRadioButton, Label } from './radio.styles';

export default function RadioButton({ size = 20, error, ...rest }: RadioProps) {
  return (
    <Label size={size} error={error}>
      <HiddenRadioButton type="radio" {...rest} />
      <CustomRadioButton size={size} error={error} />
    </Label>
  );
}
