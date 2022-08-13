/* eslint-disable jsx-a11y/label-has-associated-control */
import { forwardRef } from "react";
import styled from "styled-components";
type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Switch = forwardRef<HTMLInputElement, Props>(
  ({ style, ...props }, ref) => (
    <Container>
      <input type="checkbox" {...props} />
      <span />
    </Container>
  ),
);

const Container = styled.label`
  cursor: pointer;

  input {
    display: none;
  }
  input:active + span {
    opacity: 0.7;
  }
  span {
    display: block;
    width: 40px;
    height: 26px;
    border-radius: 18px;
    background-color: #dbdeed;
    display: flex;
    align-items: center;
    padding: 0 6px;
    border: 1px solid transparent;
    transition: 0.3s;
    &:hover {
      background-color: #dbdeed;
      &:before {
        background-color: #fff;
        box-shadow: 0 0 0 2px #fff;
      }
    }
    &:before {
      display: block;
      content: "";
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background-color: #fff;
      position: relative;
      transition: 0.3s;
      left: 0;
      transform: translateX(0);
    }
  }

  input:checked + span {
    background-color: rgb(111 187 21);
    &:hover {
      &:before {
        box-shadow: 0 0 0 2px #fff;
      }
    }
    &:before {
      background-color: #fff;
      left: 100%;
      transform: translateX(-100%);
    }
  }
`;

export default Switch;
