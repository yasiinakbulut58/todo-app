import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import axios from "axios";

import { ActionType, Action } from "../actionTypes/todosType";
import { IRootState, ITodo } from "../reducers/todosReducer";

export const getTodos: ActionCreator<
  ThunkAction<Promise<any>, IRootState, null, Action>
> = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.GET_POST_TODOS_PENDING,
    });

    try {
      const { data } = await axios.get("/todos?_sort=createdAt&_order=desc");

      dispatch({
        type: ActionType.GET_POST_TODOS_SUCCESS,
        payload: data,
      });
    } catch (err: any) {
      dispatch({
        type: ActionType.GET_POST_TODOS_FAIL,
        payload: err.message,
      });
    }
  };
};

export const setFilter = (completed: boolean | null) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.SET_TODOS_FILTER,
      payload: completed,
    });
  };
};

export const addTodo: ActionCreator<
  ThunkAction<Promise<any>, IRootState, null, Action>
> = (newTodo: ITodo) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post("/todos", newTodo, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        dispatch({
          type: ActionType.SET_ADD_TODO,
          payload: newTodo,
        });
      }
    } catch (err: any) {
      // err
    }
  };
};

export const removeTodo: ActionCreator<
  ThunkAction<Promise<any>, IRootState, null, Action>
> = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.delete(`/todos/${id}`);

      if (response.status === 200) {
        dispatch({
          type: ActionType.SET_REMOVE_TODO,
          payload: id,
        });
      }
    } catch (err: any) {
      // err
    }
  };
};

export const updateTodo: ActionCreator<
  ThunkAction<Promise<any>, IRootState, null, Action>
> = (updTodo: ITodo) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.put(`/todos/${updTodo.id}`, updTodo, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        dispatch({
          type: ActionType.SET_UPDATE_TODO,
          payload: updTodo,
        });
      }
    } catch (err: any) {
      // err
    }
  };
};
