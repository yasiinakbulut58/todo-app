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
  max-height: 500px;
  position: relative;

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
    border-radius: 5px;
  }
  display: flex;
  flex-direction: column;
  gap: 10px;

  .loading {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 2;
    border-radius: 10px;
    background: rgb(255 255 255 / 60%);
    justify-content: center;
    align-items: center;
    display: flex;

    @keyframes spinner {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    .loading-spinner {
      width: 25px;
      height: 25px;
      border: 3px solid #dbdeed;
      border-top: 3px solid #035687;
      border-radius: 50%;
      animation: spinner 1.5s linear infinite;
    }
  }

  .todo-box {
    display: flex;
    background: #fff;
    align-items: center;
    padding: 20px 10px;
    gap: 10px;
    border-radius: 10px;
    position: relative;
    .deadline {
      display: flex;
      align-items: center;
      gap: 10px;
      .pending {
        background-color: #f1c40f;
        padding: 5px 10px;
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
        border-radius: 5px;

        &.end {
          background-color: #ff2d55;
        }
      }
    }

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
        height: 20px;
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
    &.btn-delete {
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

    &.btn-clear {
      margin-top: 10px;
      margin-left: auto;
      margin-right: auto;
      width: max-content;
      padding: 0 10px;
    }
  }
  .btn[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .filter {
      display: flex;
      gap: 10px;
      @media screen and (max-width: 450px) {
        flex-direction: column;
        .custom-datepicker {
          width: 140px !important;
        }
      }

      .custom-datepicker {
        height: 40px;
        width: 150px;
        border-radius: 10px;
        padding-bottom: 2px;
        padding-right: 10px;
        padding-left: 15px;
        border: none;
        box-shadow: inset 0 0 0 100px #fff;
        background: #fff;
        -webkit-transition: 200ms;
        transition: 200ms;

        &:focus-visible {
          outline: initial;
        }
      }
    }
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
