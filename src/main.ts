// import express, { NextFunction, Request, Response } from "express";
// import { readFileSync } from "fs";
// import bodyParser from "body-parser";

// const PORT = 4000;

// const app = express();

// function myFirstMiddleware(req: Request, res: Response, next: NextFunction) {
//   console.log("my first middleware is called");

//   // transforming the request
//   req.username = "Ram";

//   // sending the response
//   const shouldSendResponse = false;
//   if (shouldSendResponse) {
//     res.status(200).json({
//       message: "you got response from myFirstMiddleware",
//     });
//     return;
//   }

//   // calling the next middleware in the chain
//   next();
// }

// function handleGetRouteMiddleware(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     console.log("req username added by the myFirstMiddleware:", req.username);

//     if (req.username !== "Ram") {
//       throw new Error("Only ram can access this route!!");
//     }

//     const query = req.query;
//     console.log("query name", query);

//     const body = req.body;

//     console.log("body", body);

//     const homePage = readFileSync("./templates/index.html", {
//       encoding: "utf-8",
//     });
//     res.send(homePage + query?.name || "no name");
//   } catch (error: any) {
//     next(error.message);
//   }
// }

// function handleGlobalErrors(
//   error: any,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   console.log("executing the global error handler...", error);

//   res.status(500).json({
//     message: "Something went wrong on the server",
//   });
// }

// app.post("/create-1", (req, res) => {
//   const body = req.body;

//   console.log("body", body);
//   res.json({
//     message: "created",
//   });
// });

// app.use(bodyParser.json());

// app.get("/", myFirstMiddleware, handleGetRouteMiddleware);

// app.post("/create-2", (req, res, next) => {
//   try {
//     const body = req.body;

//     console.log("body", body);
//     res.json({
//       message: "created",
//     });
//   } catch (error: any) {
//     next(error.message);
//   }
// });

// // middleware to handle global errors
// app.use(handleGlobalErrors);

// app.listen(PORT, () => {
//   console.log("Express app listening on port:", PORT);
// });
import express from "express";
import bodyParser from "body-parser";
import {
  createTodoController,
  deleteTodoController,
  errorhandler,
  getAllTodoController,
  getTodoController,
  updateTodoController,
} from "./controller/todo-controller";

const PORT = 4000;

const app = express();

app.use(bodyParser.json());

// todo routes

// get-todo

// request -> controller -> model
// controller -> response
app.get("/get-todo/:todoId", getTodoController);
// // create-todo
app.post("/create-todo", createTodoController);
// // update-todo
app.put("/update-todo/:todoId", updateTodoController);
// // delete-todo
app.delete("/delete-todo/:todoId", deleteTodoController);
// // get-all-todos
app.post("/get-all-todos", getAllTodoController);
app.use(errorhandler);
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
