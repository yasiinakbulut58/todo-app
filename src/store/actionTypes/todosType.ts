import { ITodo } from "../reducers/todosReducer";

export enum ActionType {
  GET_POST_TODOS_PENDING = "GET_POST_TODOS_PENDING",
  GET_POST_TODOS_SUCCESS = "GET_POST_TODOS_SUCCESS",
  GET_POST_TODOS_FAIL = "GET_POST_TODOS_FAIL",
  SET_TODOS_FILTER = "SET_TODOS_FILTER",
}

interface actionPending {
  type: ActionType.GET_POST_TODOS_PENDING;
}

interface actionSuccess {
  type: ActionType.GET_POST_TODOS_SUCCESS;
  payload: ITodo[];
}

interface setFilter {
  type: ActionType.SET_TODOS_FILTER;
  payload: boolean | null;
}

interface actionFail {
  type: ActionType.GET_POST_TODOS_FAIL;
  payload: string;
}

export type Action = actionPending | actionSuccess | actionFail | setFilter;
