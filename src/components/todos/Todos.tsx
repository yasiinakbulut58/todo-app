import * as React from "react";

import { IRootState, ITodo } from "../../store/reducers/todosReducer";
import Header from "./Header";
import List from "./List";
import { ContentWrapper, TodoContainer } from "./Styled";

export class Todos extends React.Component<
  IRootState & {
    setFilter: (complete: boolean | null) => void;
    getTodos: () => void;
    addTodo: (todo: ITodo) => void;
    removeTodo: (id: string) => void;
    updateTodo: (updTodo: ITodo) => void;
  }
> {
  componentWillMount() {
    this.props.getTodos();
  }
  public render() {
    const {
      todos,
      error,
      loading,
      filter,
      setFilter,
      addTodo,
      removeTodo,
      updateTodo,
    } = this.props;

    if (error) return <>Bir hata oluştu.</>;
    return (
      <TodoContainer>
        <ContentWrapper>
          <Header setFilter={setFilter} addTodo={addTodo} />

          {loading ? (
            <>Loading...</>
          ) : (
            <List
              todos={
                filter !== null
                  ? todos.filter((item) => item.completed === filter)
                  : todos
              }
              removeTodo={removeTodo}
              updateTodo={updateTodo}
            />
          )}
        </ContentWrapper>
      </TodoContainer>
    );
  }
}
