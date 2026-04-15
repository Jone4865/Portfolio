import styled, { css } from "styled-components";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  width?: number;
  buttonType?: "solid" | "outline";
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
  padding: 11px 22px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  font-family: inherit;
  letter-spacing: -0.01em;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.15s ease;
  cursor: pointer;
  border: 1px solid transparent;

  background-color: ${({ buttonType, theme }) =>
    buttonType === "solid" ? theme.accent : "transparent"};
  color: ${({ buttonType, theme }) =>
    buttonType === "solid" ? theme.accentContrast : theme.accent};
  border-color: ${({ buttonType, theme }) =>
    buttonType === "outline" ? theme.accent : "transparent"};
  width: ${({ width }) => (width ? `${width}px` : "auto")};
  box-shadow: ${({ buttonType, theme }) =>
    buttonType === "solid" ? `0 2px 12px ${theme.accentMuted}` : "none"};

  &:disabled {
    background-color: ${({ theme }) => theme.inputDisabledBg};
    color: ${({ theme }) => theme.textMuted};
    border-color: transparent;
    box-shadow: none;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadowElevated};
    ${({ buttonType, theme }) =>
      buttonType === "solid"
        ? css`
            filter: brightness(1.06);
          `
        : css`
            background: ${theme.accentMuted};
            border-color: ${theme.accent};
          `}
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;
