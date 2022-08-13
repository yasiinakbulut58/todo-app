import { forwardRef } from "react";
import styled from "styled-components";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const CustomInput = forwardRef<HTMLInputElement, Props>(
  ({ style, ...props }, ref) => (
    <Input
      as="input"
      style={{
        fontWeight: "regular",
        height: 44,
        borderRadius: "10px",
        paddingBottom: "2px",
        paddingRight: 10,
        paddingLeft: "20px",
        ...style,
      }}
      {...props}
      ref={ref}
    />
  ),
);

CustomInput.defaultProps = {
  type: "text",
};

export const Input = styled.div`
  border: 1px solid #035687;
  box-shadow: inset 0 0 0 100px #fff;
  background: #fff;
  transition: 200ms;

  &::placeholder {
    transition: 200ms;
  }

  &:focus {
    outline: none;
    &::placeholder {
      transform: translateX(10%);
      color: transparent;
    }
  }

  &:focus,
  &:hover,
  &:active {
    border-color: #035687;
    box-shadow: 0 0 0 1px #035687;
  }

  :-ms-input-placeholder {
    opacity: 0.5;
  }

  ::placeholder {
    opacity: 0.5;
  }
`;

export default CustomInput;
