import type { InputWithIconProps } from './inputWithIcon.types';
import { FieldInput, FieldShell, IconSlot } from './inputWithIcon.styles';

export default function InputWithIcon({
  width = 200,
  error,
  disabled,
  buttonIcon = '아이콘',
  buttonWitdh = 45,
  buttonPointer,
  ...rest
}: InputWithIconProps) {
  return (
    <FieldShell
      {...rest}
      disabled={disabled}
      width={width}
      error={error}
      buttonPointer={buttonPointer}
    >
      <FieldInput {...rest} disabled={disabled} />
      <IconSlot buttonWitdh={buttonWitdh} disabled={disabled}>
        {buttonIcon}
      </IconSlot>
    </FieldShell>
  );
}
