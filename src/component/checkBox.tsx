import styled from "styled-components";

type CheckBoxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  size?: number;
  error?: boolean;
};

const CheckBox: React.FC<CheckBoxProps> = ({ size = 20, error, ...rest }) => {
  return (
    <Label size={size} error={error}>
      <HiddenCheckBox type="checkbox" {...rest} />
      <CustomCheckBox size={size} error={error} {...rest} />
    </Label>
  );
};

export default CheckBox;

const Label = styled.label<{ size: number; error?: boolean }>`
  display: inline-block;
  position: relative;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  cursor: pointer;
`;

const HiddenCheckBox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  pointer-events: none;
`;

const CustomCheckBox = styled.div<CheckBoxProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  background-color: white;
  border: ${({ error }) => (error ? "1px solid #F84D61" : "1px solid #e8e5e5")};
  border-radius: 4px;
  transition: all 0.3s;

  ${HiddenCheckBox}:checked + & {
    background-color: #009ade;
    border-color: #009ade;
  }

  ${HiddenCheckBox}:checked + &::after {
    content: "";
    display: block;
    width: 70%;
    height: 70%;
    background-color: white;
    mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="white" d="M13.485 1.515a1 1 0 010 1.415l-8 8a1 1 0 01-1.415 0l-4-4a1 1 0 011.415-1.415L5.07 8.586 12.07 1.586a1 1 0 011.415 0z"/></svg>')
      center / contain no-repeat;
    transform: translate(11%, 11%);
  }

  ${HiddenCheckBox}:disabled + & {
    background-color: #e8e5e5;
    border-color: #d1d1d1;
    cursor: not-allowed;
  }
  &:hover {
    border-color: #009ade;
  }
`;
