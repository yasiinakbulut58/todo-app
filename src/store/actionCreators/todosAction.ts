import { toast } from "react-toastify";
import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import api from "../../api";

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
      const { data } = await api.getTodos();

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
    dispatch({
      type: ActionType.SET_REQUEST_ID,
      payload: newTodo.id,
    });
    try {
      const response = await api.addTodo(newTodo);

      if (response.status === 201) {
        dispatch({
          type: ActionType.SET_ADD_TODO,
          payload: newTodo,
        });
        toast.success("Task successfully added");
      }
    } catch (err: any) {
      // err
    }
    dispatch({
      type: ActionType.SET_REQUEST_ID,
      payload: null,
    });
  };
};

export const removeTodo: ActionCreator<
  ThunkAction<Promise<any>, IRootState, null, Action>
> = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.SET_REQUEST_ID,
      payload: id,
    });
    try {
      const response = await api.deleteTodo(id);

      if (response.status === 200) {
        dispatch({
          type: ActionType.SET_REMOVE_TODO,
          payload: id,
        });
        toast.success("Task successfully deleted");
      }
    } catch (err: any) {
      // err
    }
    dispatch({
      type: ActionType.SET_REQUEST_ID,
      payload: null,
    });
  };
};

export const updateTodo: ActionCreator<
  ThunkAction<Promise<any>, IRootState, null, Action>
> = (updTodo: ITodo) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.SET_REQUEST_ID,
      payload: updTodo.id,
    });
    try {
      const response = await api.updateTodo(updTodo);

      if (response.status === 200) {
        dispatch({
          type: ActionType.SET_UPDATE_TODO,
          payload: updTodo,
        });
        toast.success("Task successfully updated");
      }
    } catch (err: any) {
      // err
    }
    dispatch({
      type: ActionType.SET_REQUEST_ID,
      payload: null,
    });
  };
};
