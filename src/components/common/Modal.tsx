import { createPortal } from "react-dom";
import styled from "styled-components";

import Icon from "../common/Icon";
export type ModalProps = {
  onRequestClose: () => void;
  title: string;
  size?: number;
  isOpen: boolean;
  children: any;
};

const Modal: React.FC<ModalProps> = ({
  children,
  onRequestClose,
  title,
  size,
  isOpen,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <Container>
      <div
        className="overlay"
        onClick={onRequestClose}
        role="button"
        tabIndex={-1}
      />
      <div
        style={{
          borderRadius: "small",
          boxShadow: "header",
          width: size,
        }}
        className="content"
      >
        <div
          className="modal-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "-7px",
          }}
        >
          <h3>{title}</h3>
          <button
            type="button"
            className="close-button"
            onClick={onRequestClose}
          >
            <Icon name="add" />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </Container>,
    document.body,
  );
};

Modal.defaultProps = {
  size: 500,
};

export const Container = styled.div`
  padding: 0 20px;
  inset: 0px;
  position: fixed;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;

  .overlay {
    position: absolute;
    inset: 0px;
    backdrop-filter: blur(2.1px);
    background-color: rgba(151, 153, 203, 0.2);
  }

  .content {
    z-index: 5;
    position: relative;
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    background-color: rgb(255, 255, 255);
    padding: 28px;
    border-radius: 10px;
    box-shadow: rgb(151 153 203 / 23%) 0px 10px 30px;
  }

  .close-button {
    position: absolute;
    top: 15px;
    right: 15px;
    background: #dbdeed;
    border: 1px solid #dbdeed;
    border-radius: 50%;
    cursor: pointer;
    transition: 200ms;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    svg {
      width: 16px;
      transform: rotate(45deg);
      fill: #fff;
    }

    &:hover {
      box-shadow: 0 0 0 2px #dbdeed;
    }
  }
  .modal-header {
    h3 {
      font-weight: 600;
      margin: 0;
    }
  }
  .modal-body {
    padding-top: 25px;
  }
`;

export default Modal;
