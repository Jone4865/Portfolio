import styled from "styled-components";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  width?: number;
  error?: boolean;
};

const Input: React.FC<InputProps> = ({ children, width, error, ...rest }) => {
  return <Container error={error} width={width} {...rest} />;
};

export default Input;

const Container = styled.input<InputProps>`
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s;

  width: ${({ width }) => (width ? `${width}px` : "auto")};
  border: solid 1px ${({ error }) => (error ? "#F84D61" : "#e8e5e5")};

  &:disabled {
    background-color: #e8e5e5;
    cursor: not-allowed;
  }

  &:hover {
    border: solid 1px ${({ disabled }) => (disabled ? "none" : "#009ade")};
  }
  color: ${({ disabled }) => (disabled ? "#817d7d" : "#333")};
`;
