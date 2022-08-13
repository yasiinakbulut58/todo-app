import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
  Store,
} from "redux";
import thunk from "redux-thunk";
import { todoReducer, IRootState } from "./reducers/todosReducer";

export interface IAppState {
  todosState: IRootState;
}

const rootReducer = combineReducers<IAppState>({
  todosState: todoReducer,
});

export default function configureStore(): Store<IAppState, any> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  return store;
}
