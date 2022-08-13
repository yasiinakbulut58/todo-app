import { Reducer } from "redux";
import { Action, ActionType } from "../actionTypes/todosType";

export interface ITodo {
  id: string;
  title: string;
  createdAt: string;
  completed: boolean;
}

export interface IRootState {
  todos: ITodo[];
  loading: boolean;
  error: string | null;
}

const initialState = {
  todos: [],
  loading: false,
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
    case ActionType.SET_LOADING:
      return {
        ...state,
        requestId: action.payload,
      };
    case ActionType.SET_ADD_TODO:
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };
    case ActionType.SET_REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action.payload),
      };
    case ActionType.SET_UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((item) =>
          item.id === action.payload.id
            ? {
                ...action.payload,
              }
            : { ...item },
        ),
      };
    default:
      return state;
  }
};
