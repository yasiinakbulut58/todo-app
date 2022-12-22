import { useMemo, useState } from "react";

import { IRootState, ITodo } from "../../store/reducers/todosReducer";
import Modal from "../common/Modal";
import ConfirmModal from "./ConfirmModal";
import Header from "./Header";
import List from "./List";
import { ContentWrapper, TodoContainer } from "./Styled";

type Props = IRootState & {
  getTodos: (
    completed: string,
    createdAt_gte: Date,
    createdAt_lte?: Date,
  ) => void;
  addTodo: (todo: ITodo) => void;
  removeTodo: (id: string) => void;
  updateTodo: (updTodo: ITodo) => void;
  deleteCompletedTodos: (allTodos: ITodo[]) => void;
};

export const Todos: React.FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    todos,
    loading,
    addTodo,
    removeTodo,
    updateTodo,
    deleteCompletedTodos,
    getTodos,
  } = props;

  const completedTodos = useMemo(() => {
    let filteredTodos: ITodo[] = [];
    if (todos && todos.length > 0) {
      for (let i = 0; i < todos.length; i++) {
        if (todos[i].completed) filteredTodos.push(todos[i]);
      }
    }
    return filteredTodos;
  }, [todos]);

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
        {completedTodos && completedTodos.length > 0 && (
          <button
            className="btn btn-clear"
            disabled={loading}
            onClick={() => setIsOpen(true)}
            type="button"
          >
            Clear Completed
          </button>
        )}
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          title="Confirm"
        >
          <ConfirmModal
            loading={loading}
            desc="Are you sure you want to delete completed tasks?"
            onRequestClose={() => setIsOpen(false)}
            onDelete={() => {
              deleteCompletedTodos(completedTodos);
              setIsOpen(false);
            }}
          />
        </Modal>
      </ContentWrapper>
    </TodoContainer>
  );
};
