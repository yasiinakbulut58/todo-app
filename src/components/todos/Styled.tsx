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
  overflow-y: auto;
  width: calc(100% + 10px);
  margin-left: -5px;
  padding: 0 5px;
  max-height: 500px;

  scrollbar-width: thin; //for firefox
  scrollbar-color: #035687 transparent; //for firefox
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #035687;
  }
  display: flex;
  flex-direction: column;
  gap: 10px;

  .todo-box {
    display: flex;
    background: #fff;
    align-items: center;
    padding: 15px 10px;
    gap: 10px;
    border-radius: 10px;
    position: relative;

    .status {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      position: absolute;
      top: 0px;
      display: flex;
      left: 50%;
      transform: translateX(-50%);

      .completed {
        background-color: rgb(111 187 21);
        height: 25px;
        margin-left: 10px;
        padding: 0px 20px;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        color: rgb(255, 255, 255);
        user-select: none;
        transition: padding 0.3s ease 0s, height 0.3s ease 0s;
        font-size: 10px;
        font-weight: 500;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
      }
    }

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
  word-break: break-word;
  text-decoration: ${({ completed }) =>
    completed ? "line-through" : "initial"}; ;
`;

const ContentWrapper = styled.div`
  width: 550px;
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
