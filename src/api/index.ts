import { ITodo } from "../store/reducers/todosReducer";
import * as http from "./http-common";

class API {
  static async getTodos(
    completed: string,
    createdAt_gte: Date,
    createdAt_lte?: Date,
  ) {
    const oneDayLater = new Date(createdAt_gte.getTime() + 86400000);

    const searchParams = new URLSearchParams({
      _sort: "createdAt",
      _order: "desc",
      createdAt_gte: createdAt_gte.toLocaleDateString("tr-TR"),
      createdAt_lte:
        createdAt_lte?.toLocaleDateString("tr-TR") ||
        oneDayLater.toLocaleDateString("tr-TR"),
      ...(completed !== "all" ? { completed: completed } : {}),
    });
    const options = {
      method: "get",
      url: `/todos?${searchParams}`,
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
      data: JSON.stringify({
        title: newTodo.title,
        createdAt: newTodo.createdAt,
        completed: newTodo.completed,
        deadline: newTodo.deadline,
      }),
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
      data: JSON.stringify({
        title: updTodo.title,
        createdAt: updTodo.createdAt,
        completed: updTodo.completed,
        deadline: updTodo.deadline,
      }),
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
