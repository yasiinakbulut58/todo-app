import * as React from "react";
import { createRoot } from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import { Provider } from "react-redux";

import configureStore from "./store";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ToastContainerBase from "./ToastContainer";
import { getTodos } from "./store/actionCreators/todosAction";

// Generate the store
const store = configureStore();
store.dispatch(
  getTodos(
    "all",
    new Date(new Date().getTime() - 86400000 * 5), // 5 days ago
    new Date(new Date().getTime() + 86400000),
  ),
);

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainerBase />
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
