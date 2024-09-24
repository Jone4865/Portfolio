import React from "react";
import styled from "styled-components";

type InputWithIconProps = React.InputHTMLAttributes<HTMLInputElement> & {
  width?: number;
  error?: boolean;
  disabled?: boolean;
  buttonIcon?: React.ReactNode;
  buttonWitdh?: number;
  buttonPointer?: boolean;
};

const InputWithIcon: React.FC<InputWithIconProps> = ({
  children,
  width = 200,
  error,
  disabled,
  buttonIcon = "아이콘",
  buttonWitdh = 45,
  buttonPointer,
  ...rest
}) => {
  return (
    <Container
      {...rest}
      disabled={disabled}
      width={width}
      error={error}
      buttonPointer={buttonPointer}
    >
      <Input {...rest} disabled={disabled} />
      <Button buttonWitdh={buttonWitdh} disabled={disabled}>
        {buttonIcon}
      </Button>
    </Container>
  );
};

export default InputWithIcon;

const Container = styled.div<InputWithIconProps>`
  display: flex;
  border: solid 1px red;
  border-radius: 10px;
  border: solid 1px ${({ error }) => (error ? "#F84D61" : "#e8e5e5")};

  &:hover {
    border: solid 1px ${({ disabled }) => (disabled ? "none" : "#009ade")};
    cursor: ${({ disabled, buttonPointer }) =>
      disabled ? "not-allowed" : buttonPointer ? "pointer" : "default"};
  }
`;

const Input = styled.input<InputWithIconProps>`
  border: none;
  outline: none;
  width: 100%;
  padding: 10px 0 10px 20px;
  border-radius: 10px 0 0 10px;
  background-color: ${({ disabled }) => (disabled ? "#e8e5e5" : undefined)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : undefined)};
`;

const Button = styled.div<InputWithIconProps>`
  white-space: nowrap;
  border-radius: 0 10px 10px 0;
  padding: 10px 20px 10px 0;
  background-color: ${({ disabled }) => (disabled ? "#e8e5e5" : undefined)};
  color: ${({ disabled }) => (disabled ? "#817d7d" : "#333")};
`;
