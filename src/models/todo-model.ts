type TTodostatus = "not_started" | "in_progress" | "done";
type TTodo = {
  id: number;
  name: string;
  status: TTodostatus;
};

const todos: TTodo[] = [
  {
    id: 1,
    name: "Reading about mvc pattern",
    status: "in_progress",
  },
  {
    id: 2,
    name: "learning about mvc pattern",
    status: "in_progress",
  },
  {
    id: 3,
    name: "understanting about mvc pattern",
    status: "in_progress",
  },
];

export class TodoModel {
  constructor() {
    console.log("todo constructor is called");
  }

  getTodo(todoId: number) {
    const todo = todos.find((todo) => todo.id === todoId);
    return todo;
  }

  createTodo(name: string, status: TTodostatus) {
    const todo: TTodo = {
      id: todos.length + 1,
      name,
      status,
    };
    todos.push(todo);
    return todo;
  }

  deleteTodo(todoId: number) {
    const todo = todos.filter((todo) => {
      if (todo.id === todoId) {
        return false;
      }
      return true;
    });
    return todo;
  }

  updateTodo(todoId: number, name: string, status: TTodostatus) {
    const todoIndex = todos.findIndex((todo) => {
      return todo.id === todoId;
    });

    if (todoIndex === -1) {
      console.error("todo not found");
      return null;
    }
    todos[todoIndex] = {
      ...todos[todoIndex],
      name,
      status,
    };
    return todos[todoIndex];
  }

  getAllTodo() {
    return todos;
  }
}
