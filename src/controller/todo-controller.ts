import { NextFunction, Request, Response } from "express";
import { TodoModel } from "../models/todo-model";
import { log } from "console";

/**
 * This file contains code related to todo controller
 */
export const errorhandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("executing the error handler:", error);
  res.status(500).json({
    error: "Something went wrong on the server",
  });
};

export function getTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const todoId = req.params.todoId;

    if (!todoId) {
      //question to ask
      next("Please provide valid todoId");
      return;
    }

    const myTodoModel = new TodoModel();

    const todo = myTodoModel.getTodo(parseInt(todoId as string));

    if (!todo) {
      res.status(404).json({
        messagge: "todo not found",
      });
      return;
    }

    res.json({
      data: todo,
    });
  } catch (error: any) {
    next(error.message);
  }
}

export function createTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;

    const name = body.name;
    const status = body.status;

    const myTodoModel = new TodoModel();
    const createTodo = myTodoModel.createTodo(name, status);

    res.status(201).json({
      data: createTodo,
      message: "Todo is created successfully!!",
    });
  } catch (error: any) {
    next(error.message);
  }
}

export function updateTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const todoId = req.params.todoId;
  const body = req.body;
  const name = body.name;
  const status = body.status;

  const myTodoModel = new TodoModel();
  const updateTodo = myTodoModel.updateTodo(parseInt(todoId), name, status);

  if (!updateTodo) {
    res.status(404).json({
      error: "todo not found",
    });
    return;
  }
  res.status(201).json({
    data: updateTodo,
    message: "update todo",
  });
  //   console.log(updateTodo);
}

export function deleteTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const todoId = req.params.todoId;
    const myTodoModel = new TodoModel();
    const todo = myTodoModel.deleteTodo(parseInt(todoId));
    res.json({
      data: todo,
    });
    console.log(todo);
  } catch (error: any) {
    next(error.message);
  }
}

export function getAllTodoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const myTodoModel = new TodoModel();
    const todo = myTodoModel.getAllTodo();
    res.json({
      data: todo,
    });
    console.log(todo);
  } catch (error: any) {
    next(error.message);
  }
}
