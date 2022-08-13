import { ITodo } from "../../store/reducers/todosReducer";
import Switch from "../common/Switch";
import Icon from "../common/Icon";
import { ListWrapper, TextWrapper } from "./Styled";
import styled from "styled-components";
import Modal from "../common/Modal";
import TaskModal from "./Modal";
import { useCallback, useState } from "react";

type Props = {
  todos: ITodo[];
  requestId: string | null;
  removeTodo: (id: string) => void;
  updateTodo: (updTodo: ITodo) => void;
};
const List: React.FC<Props> = ({
  todos,
  requestId,
  removeTodo,
  updateTodo,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITodo | null>(null);

  const onSubmit = useCallback(
    (values: { title: string; completed: boolean }) => {
      if (selectedTask) {
        updateTodo({
          ...selectedTask,
          title: values.title,
          completed: values.completed || false,
        });
      }

      setIsOpen(false);
      setSelectedTask(null);
    },
    [selectedTask],
  );

  const Todo = (todo: ITodo) => (
    <>
      {todo.completed && (
        <div className="status">
          <div className="completed">COMPLETED</div>
        </div>
      )}
      <Switch
        checked={todo.completed}
        disabled={requestId === todo.id}
        onChange={(e) => {
          const { checked } = e.target;
          updateTodo({ ...todo, completed: checked });
        }}
      />
      <div className="content">
        <TextWrapper completed={todo.completed}>{todo.title}</TextWrapper>
        <span className="createdAt">{todo.createdAt}</span>
      </div>
      <div className="actions">
        {!todo.completed && (
          <button
            type="button"
            className="btn btn-edit"
            onClick={() => {
              setSelectedTask(todo);
              setIsOpen(true);
            }}
          >
            <Icon name="edit" />
          </button>
        )}
        <button
          type="button"
          disabled={requestId === todo.id}
          onClick={() => removeTodo(todo.id)}
          className="btn btn-clear"
        >
          <Icon name="delete" />
        </button>
      </div>
    </>
  );

  if (!todos || todos.length === 0)
    return <EmptyWrapper>No task🥳</EmptyWrapper>;

  return (
    <ListWrapper>
      {todos.map((item, idx) => (
        <div
          className="todo-box"
          style={{ opacity: item.completed ? 0.5 : 1 }}
          key={idx}
        >
          <Todo {...item} />
        </div>
      ))}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        title="Update Task"
      >
        <TaskModal
          type="edit"
          requestId={requestId}
          onRequestClose={() => setIsOpen(false)}
          title={selectedTask?.title}
          onSubmit={onSubmit}
        />
      </Modal>
    </ListWrapper>
  );
};

const EmptyWrapper = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 10px;
`;

export default List;
