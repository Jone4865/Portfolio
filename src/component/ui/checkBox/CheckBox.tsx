import type { CheckBoxProps } from './checkBox.types';
import { CustomCheckBox, HiddenCheckBox, Label } from './checkBox.styles';

export default function CheckBox({ size = 20, error, ...rest }: CheckBoxProps) {
  return (
    <Label size={size} error={error}>
      <HiddenCheckBox type="checkbox" {...rest} />
      <CustomCheckBox size={size} error={error} {...rest} />
    </Label>
  );
}
