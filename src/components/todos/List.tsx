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
  removeTodo: (id: string) => void;
  updateTodo: (updTodo: ITodo) => void;
};
const List: React.FC<Props> = ({ todos, removeTodo, updateTodo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITodo | null>(null);

  const onSubmit = useCallback(
    (values: { title: string }) => {
      if (selectedTask) {
        updateTodo({
          ...selectedTask,
          title: values.title,
        });
      }
      setIsOpen(false);
      setSelectedTask(null);
    },
    [updateTodo, selectedTask],
  );

  if (todos.length === 0 || !todos.length)
    return <EmptyWrapper>No task🥳</EmptyWrapper>;

  return (
    <ListWrapper>
      {todos.map((item, idx) => (
        <div
          className="todo-box"
          style={{ opacity: item.completed ? 0.5 : 1 }}
          key={idx}
        >
          <Switch
            checked={item.completed}
            onChange={(e) => {
              const { checked } = e.target;
              updateTodo({ ...item, completed: checked });
            }}
          />
          <div className="content">
            <TextWrapper completed={item.completed}>{item.title}</TextWrapper>
            <span className="createdAt">{item.createdAt}</span>
          </div>
          <div className="actions">
            {!item.completed && (
              <button
                type="button"
                className="btn btn-edit"
                onClick={() => {
                  setSelectedTask(item);
                  setIsOpen(true);
                }}
              >
                <Icon name="edit" />
              </button>
            )}
            <button
              type="button"
              onClick={() => removeTodo(item.id)}
              className="btn btn-clear"
            >
              <Icon name="delete" />
            </button>
          </div>
        </div>
      ))}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        title="Update Task"
      >
        <TaskModal
          type="edit"
          title={selectedTask?.title}
          onSubmit={onSubmit}
          formIsLoading={false}
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
