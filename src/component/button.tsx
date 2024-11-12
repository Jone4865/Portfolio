import styled from "styled-components";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  width?: number;
  buttonType?: "solid" | "outline";
  test?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  width,
  buttonType = "solid",
  ...rest
}) => {
  return (
    <Container width={width} buttonType={buttonType} {...rest}>
      {children}
    </Container>
  );
};

export default Button;

const Container = styled.button<ButtonProps>`
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s;
  cursor: pointer;

  background-color: ${({ buttonType }) =>
    buttonType === "solid" ? "#9965e1" : "#fff"};
  color: ${({ buttonType }) => (buttonType === "solid" ? "white" : "#9965e1")};
  border: ${({ buttonType }) =>
    buttonType === "solid" ? "none" : "solid 1px #9965e1"};
  width: ${({ width }) => (width ? `${width}px` : "auto")};

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#cccccc" : "#bf9af2")};
    border-color: #bf9af2;
    color: #fff;
  }
`;
