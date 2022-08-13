import { connect } from "react-redux";

import { IAppState } from "../../store";
import {
  addTodo,
  deleteAllTodos,
  getTodos,
  removeTodo,
  updateTodo,
} from "../../store/actionCreators/todosAction";
import { Todos } from "./Todos";

const mapDispatchToProps = {
  getTodos,
  addTodo,
  removeTodo,
  updateTodo,
  deleteAllTodos,
};

const mapStateToProps = (store: IAppState) => {
  return {
    todos: store.todosState.todos,
    loading: store.todosState.loading,
    error: store.todosState.error,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
