import { useState } from "react";

import { IRootState, ITodo } from "../../store/reducers/todosReducer";
import Modal from "../common/Modal";
import ConfirmModal from "./ConfirmModal";
import Header from "./Header";
import List from "./List";
import { ContentWrapper, TodoContainer } from "./Styled";

type Props = IRootState & {
  getTodos: (completed: string) => void;
  addTodo: (todo: ITodo) => void;
  removeTodo: (id: string) => void;
  updateTodo: (updTodo: ITodo) => void;
  deleteAllTodos: (allTodos: ITodo[]) => void;
};

export const Todos: React.FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    todos,
    loading,
    addTodo,
    removeTodo,
    updateTodo,
    deleteAllTodos,
    getTodos,
  } = props;

  return (
    <TodoContainer>
      <ContentWrapper>
        <Header addTodo={addTodo} loading={loading} getTodos={getTodos} />
        <List
          loading={loading}
          todos={todos}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
        {todos && todos.length > 0 && (
          <button
            className="btn btn-clear"
            onClick={() => setIsOpen(true)}
            type="button"
          >
            Clear All
          </button>
        )}
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          title="Confirm"
        >
          <ConfirmModal
            loading={loading}
            desc="Are you sure you want to delete all?"
            onRequestClose={() => setIsOpen(false)}
            onDelete={() => {
              deleteAllTodos(todos);
              setIsOpen(false);
            }}
          />
        </Modal>
      </ContentWrapper>
    </TodoContainer>
  );
};
