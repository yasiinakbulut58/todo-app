import { toast } from "react-toastify";
import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import api from "../../api";

import { ActionType, Action } from "../actionTypes/todosType";
import { IRootState, ITodo } from "../reducers/todosReducer";

export const getTodos: ActionCreator<
  ThunkAction<Promise<any>, IRootState, null, Action>
> = (completed: string, createdAt_gte: Date, createdAt_lte?: Date) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.GET_POST_TODOS_PENDING,
    });

    try {
      const { data } = await api.getTodos(
        completed,
        createdAt_gte,
        createdAt_lte,
      );

      dispatch({
        type: ActionType.GET_POST_TODOS_SUCCESS,
        payload: data || [],
      });
    } catch (err: any) {
      dispatch({
        type: ActionType.GET_POST_TODOS_FAIL,
        payload: err.message,
      });
    }
  };
};

export const addTodo: ActionCreator<
  ThunkAction<Promise<any>, IRootState, null, Action>
> = (newTodo: ITodo) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.SET_LOADING,
      payload: true,
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
      type: ActionType.SET_LOADING,
      payload: false,
    });
  };
};

export const removeTodo: ActionCreator<
  ThunkAction<Promise<any>, IRootState, null, Action>
> = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.SET_LOADING,
      payload: true,
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
      type: ActionType.SET_LOADING,
      payload: false,
    });
  };
};

export const deleteCompletedTodos: ActionCreator<
  ThunkAction<Promise<any>, IRootState, null, Action>
> = (todos: ITodo[]) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.SET_LOADING,
      payload: true,
    });
    try {
      const ids = todos.map((item) => item.id);
      const deleteAll = ids.map((id) => api.deleteTodo(id));

      const response = await Promise.all(deleteAll);

      if (response.every((item) => item.status === 200)) {
        dispatch({
          type: ActionType.SET_INCOMPLETED_TODOS,
        });
        toast.success("Tasks successfully deleted");
      }
    } catch (err: any) {
      // err
    }
    dispatch({
      type: ActionType.SET_LOADING,
      payload: false,
    });
  };
};

export const updateTodo: ActionCreator<
  ThunkAction<Promise<any>, IRootState, null, Action>
> = (updTodo: ITodo) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.SET_LOADING,
      payload: true,
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
      type: ActionType.SET_LOADING,
      payload: false,
    });
  };
};
