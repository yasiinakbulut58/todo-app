import { ITodo } from "../reducers/todosReducer";

export enum ActionType {
  GET_POST_TODOS_PENDING = "GET_POST_TODOS_PENDING",
  GET_POST_TODOS_SUCCESS = "GET_POST_TODOS_SUCCESS",
  GET_POST_TODOS_FAIL = "GET_POST_TODOS_FAIL",
  SET_ADD_TODO = "SET_ADD_TODO",
  SET_REMOVE_TODO = "SET_REMOVE_TODO",
  SET_UPDATE_TODO = "SET_UPDATE_TODO",
  SET_LOADING = "SET_LOADING",
}

interface actionPending {
  type: ActionType.GET_POST_TODOS_PENDING;
}

interface actionSuccess {
  type: ActionType.GET_POST_TODOS_SUCCESS;
  payload: ITodo[];
}

interface actionFail {
  type: ActionType.GET_POST_TODOS_FAIL;
  payload: string;
}

interface setAddOrUpdateTodo {
  type: ActionType.SET_ADD_TODO | ActionType.SET_UPDATE_TODO;
  payload: ITodo;
}

interface setRemoveTodo {
  type: ActionType.SET_REMOVE_TODO;
  payload: string;
}

interface setLoading {
  type: ActionType.SET_LOADING;
  payload: boolean;
}

export type Action =
  | actionPending
  | actionSuccess
  | actionFail
  | setRemoveTodo
  | setLoading
  | setAddOrUpdateTodo;
