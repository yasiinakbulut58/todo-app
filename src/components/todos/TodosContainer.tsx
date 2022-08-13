import { connect } from "react-redux";

import { IAppState } from "../../store";
import {
  addTodo,
  getTodos,
  removeTodo,
  setFilter,
  updateTodo,
} from "../../store/actionCreators/todosAction";
import { Todos } from "./Todos";

const mapDispatchToProps = {
  setFilter,
  getTodos,
  addTodo,
  removeTodo,
  updateTodo,
};

const mapStateToProps = (store: IAppState) => {
  return {
    todos: store.todosState.todos,
    loading: store.todosState.loading,
    error: store.todosState.error,
    filter: store.todosState.filter,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
