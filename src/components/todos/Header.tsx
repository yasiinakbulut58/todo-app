import { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";

import styled from "styled-components";
import { ITodo } from "../../store/reducers/todosReducer";
import { Dropdown } from "../common/Dropdown";
import Icon from "../common/Icon";
import Modal from "../common/Modal";
import TaskModal from "./Modal";

type Props = {
  requestId: string | null;
  addTodo: (todo: ITodo) => void;
  getTodos: (completed: string) => void;
};

const list = [
  { value: "all", label: "All" },
  { value: "false", label: "Incompleted" },
  { value: "true", label: "Completed" },
];

const Header: React.FC<Props> = ({ requestId, addTodo, getTodos }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = useCallback(
    (values: { title: string; completed: boolean }) => {
      addTodo({
        id: uuid(),
        title: values.title,
        completed: values.completed || false,
        createdAt: new Date().toLocaleString(),
      });
      setIsOpen(false);
    },
    [],
  );

  return (
    <>
      <HeaderWrapper>
        <span>Todo List</span>
      </HeaderWrapper>
      <div className="header">
        <Dropdown
          list={list}
          onSelected={(value) => getTodos(value)}
          defaultValue="all"
        />
        <button
          className="btn btn-add"
          disabled={!!requestId}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <Icon name="add" />
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        title="Add Task"
      >
        <TaskModal
          type="add"
          onRequestClose={() => setIsOpen(false)}
          requestId={requestId}
          onSubmit={onSubmit}
        />
      </Modal>
    </>
  );
};

const HeaderWrapper = styled.div`
  color: #035687;
  font-weight: 600;
  font-size: 22px;
  text-align: center;
  margin-bottom: 10px;
`;

export default Header;
