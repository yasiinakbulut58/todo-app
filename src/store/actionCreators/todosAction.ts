import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import axios from "axios";

import { ActionType, Action } from "../actionTypes/todosType";
import { IRootState } from "../reducers/todosReducer";

export const getTodos: ActionCreator<
  ThunkAction<Promise<any>, IRootState, null, Action>
> = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.GET_POST_TODOS_PENDING,
    });

    try {
      const { data } = await axios.get("/todos?_sort=id&_order=desc");

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
