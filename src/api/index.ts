import { ITodo } from "../store/reducers/todosReducer";
import * as http from "./http-common";

class API {
  static async getTodos() {
    const options = {
      method: "get",
      url: "/todos?_sort=createdAt&_order=desc",
    };
    return http.jsonServer(options);
  }

  static async addTodo(newTodo: ITodo) {
    const options = {
      method: "post",
      url: "/todos",
      headers: {
        "Content-Type": "application/json",
      },
      data: newTodo,
    };
    return http.jsonServer(options);
  }

  static async updateTodo(updTodo: ITodo) {
    const options = {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      url: encodeURI(`/todos/${updTodo.id}`),
      data: updTodo,
    };
    return http.jsonServer(options);
  }

  static async deleteTodo(id: string) {
    const options = {
      method: "delete",
      url: encodeURI(`/todos/${id}`),
    };
    return http.jsonServer(options);
  }
}

export default API;
