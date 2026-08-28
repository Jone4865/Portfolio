import type { TextAreaProps } from './textArea.types';
import { TextAreaRoot } from './textArea.styles';

export default function TextArea({ width, error, ...rest }: TextAreaProps) {
  return <TextAreaRoot error={error} width={width} {...rest} />;
}
