import styled from "styled-components";

type Props = {
  loading: boolean;
  desc: string;
  onRequestClose: () => void;
  onDelete: () => void;
};

const ConfirmModal: React.FC<Props> = ({
  loading,
  desc,
  onRequestClose,
  onDelete,
}) => {
  return (
    <Container>
      <div className="content-body">{desc}</div>
      <div className="footer">
        <button
          className="btn btn-cancel"
          disabled={loading}
          onClick={onRequestClose}
          type="button"
        >
          Cancel
        </button>
        <button
          className="btn"
          disabled={loading}
          onClick={onDelete}
          type="button"
        >
          Yes
        </button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 15px;

    .btn {
      height: 32px;
      width: max-content;
      padding: 0 10px;
      background: #035687;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      font-weight: 600;
      color: White;
      cursor: pointer;
      transition: 200ms;

      &.btn-cancel {
        background: rgb(219, 222, 237);
        &:hover {
          box-shadow: 0 0 0 2px rgb(219, 222, 237);
        }
      }

      &:hover {
        box-shadow: 0 0 0 2px #035687;
      }
    }
    .btn[disabled] {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;

export default ConfirmModal;
