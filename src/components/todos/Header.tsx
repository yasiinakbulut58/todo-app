import { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";

import styled from "styled-components";
import { ITodo } from "../../store/reducers/todosReducer";
import { Dropdown } from "../common/Dropdown";
import Icon from "../common/Icon";
import Modal from "../common/Modal";
import TaskModal from "./Modal";

type Props = {
  setFilter: (completed: boolean | null) => void;
  addTodo: (todo: ITodo) => void;
};

const list = [
  { value: "all", label: "All" },
  { value: "false", label: "Incompleted" },
  { value: "true", label: "Completed" },
];

const Header: React.FC<Props> = ({ setFilter, addTodo }) => {
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
    [addTodo],
  );

  return (
    <>
      <HeaderWrapper>
        <span>Todo List</span>
      </HeaderWrapper>
      <div className="header">
        <Dropdown
          list={list}
          onSelected={(value) =>
            setFilter(value !== "all" ? value === "true" : null)
          }
          defaultValue="all"
        />
        <button
          className="btn btn-add"
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
        <TaskModal type="add" onSubmit={onSubmit} />
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
