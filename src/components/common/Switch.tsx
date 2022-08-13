/* eslint-disable jsx-a11y/label-has-associated-control */
import styled from "styled-components";

const Switch: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  name,
  ...props
}) => (
  <Container>
    <input type="checkbox" {...props} />
    <span />
  </Container>
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
        background-color: #035687;
        box-shadow: 0 0 0 2px #035687;
      }
    }
    &:before {
      display: block;
      content: "";
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background-color: #035687;
      position: relative;
      transition: 0.3s;
      left: 0;
      transform: translateX(0);
    }
  }

  input:checked + span {
    background-color: #035687;
    &:hover {
      &:before {
        box-shadow: 0 0 0 2px #dbdeed;
      }
    }
    &:before {
      background-color: #dbdeed;
      left: 100%;
      transform: translateX(-100%);
    }
  }
`;

export default Switch;
