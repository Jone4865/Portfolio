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
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 16px;
  border-width: 1px;
  border-style: solid;
  resize: none;
  outline: none;
  transition: all 0.3s;

  border-color: ${({ error }) => (error ? "#F84D61" : "#e8e5e5")};
  width: ${({ width }) => (width ? `${width}px` : "auto")};

  &:disabled {
    background-color: #e8e5e5;
    cursor: not-allowed;
  }

  &:hover {
    border: solid 1px ${({ disabled }) => (disabled ? "none" : "#009ade")};
  }
  color: ${({ disabled }) => (disabled ? "#817d7d" : "#333")};
`;
