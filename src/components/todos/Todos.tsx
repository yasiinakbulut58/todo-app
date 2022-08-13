import * as React from "react";

import { IRootState, ITodo } from "../../store/reducers/todosReducer";
import Header from "./Header";
import List from "./List";
import { ContentWrapper, TodoContainer } from "./Styled";

export class Todos extends React.Component<
  IRootState & {
    getTodos: (completed: string) => void;
    addTodo: (todo: ITodo) => void;
    removeTodo: (id: string) => void;
    updateTodo: (updTodo: ITodo) => void;
  }
> {
  componentWillMount() {
    this.props.getTodos("all");
  }
  public render() {
    const {
      todos,
      loading,
      requestId,
      addTodo,
      removeTodo,
      updateTodo,
      getTodos,
    } = this.props;

    return (
      <TodoContainer>
        <ContentWrapper>
          <Header requestId={requestId} addTodo={addTodo} getTodos={getTodos} />
          {loading ? (
            <>Loading...</>
          ) : (
            <List
              todos={todos}
              requestId={requestId}
              removeTodo={removeTodo}
              updateTodo={updateTodo}
            />
          )}
        </ContentWrapper>
      </TodoContainer>
    );
  }
}
