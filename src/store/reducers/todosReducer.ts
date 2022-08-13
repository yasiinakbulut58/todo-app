import { Reducer } from "redux";

import { Action, ActionType } from "../actionTypes/todosType";

export interface ITodo {
  id: number;
  title: string;
  createdAt: string;
  completed: boolean;
}

export interface IRootState {
  todos: ITodo[];
  loading: boolean;
  error: string | null;
  filter: boolean | null;
}

const initialState = {
  todos: [],
  loading: false,
  filter: null,
  error: null,
};

export const todoReducer: Reducer<IRootState, Action> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case ActionType.GET_POST_TODOS_PENDING:
      return {
        ...state,
        loading: true,
      };
    case ActionType.GET_POST_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.payload,
      };
    case ActionType.GET_POST_TODOS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ActionType.SET_TODOS_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};
