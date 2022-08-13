import styled from "styled-components";

const TodoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Inter", sans-serif;
  background-color: #d8dff7;
  background-size: cover;
  height: 100vh;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .todo-box {
    display: flex;
    background: #fff;
    align-items: center;
    padding: 10px;
    gap: 10px;
    border-radius: 10px;

    .actions {
      display: flex;
      gap: 5px;
    }

    .content {
      width: calc(100% - 100px);
      display: flex;
      flex-direction: column;
      gap: 5px;

      .createdAt {
        font-size: 13px;
        color: gray;
      }
    }
  }
`;

const TextWrapper = styled.div<{
  completed: boolean;
}>`
  font-weight: 600;
  text-decoration: ${({ completed }) =>
    completed ? "line-through" : "initial"}; ;
`;

const ContentWrapper = styled.div`
  width: 550px;
  min-height: 500px;
  background: rgba(255, 255, 255, 0.25);
  padding: 20px;
  margin-top: 10px;
  border-radius: 12px;
  backdrop-filter: blur(25px);

  .btn {
    height: 32px;
    width: 130px;
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
    &.btn-add,
    &.btn-edit,
    &.btn-clear {
      width: max-content;
      background-color: #dbdeed;
      color: #035687;
      border-radius: 50%;
      &:hover {
        box-shadow: 0 0 0 2px #dbdeed;
      }
      svg {
        width: 20px;
        height: auto;
      }
    }
  }
  .btn[disabled] {
    cursor: not-allowed;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
`;

const EmptyWrapper = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export {
  EmptyWrapper,
  ContentWrapper,
  TodoContainer,
  ListWrapper,
  TextWrapper,
};
