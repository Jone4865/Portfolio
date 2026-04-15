import styled from "styled-components";

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  width?: number;
  error?: boolean;
};

const TextArea: React.FC<TextAreaProps> = ({
  children,
  width,
  error,
  ...rest
}) => {
  return <Container error={error} width={width} {...rest} />;
};

export default TextArea;

const Container = styled.textarea<TextAreaProps>`
  padding: 12px 18px;
  border-radius: 12px;
  font-size: 15px;
  font-family: inherit;
  border: 1px solid
    ${({ error, theme }) => (error ? theme.accent : theme.inputBorder)};
  resize: vertical;
  min-height: 100px;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  width: ${({ width }) => (width ? `${width}px` : "auto")};
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};

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
