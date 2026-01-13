/**
 *  run this by using:
 *  npx nodemon app.js
 */

const express = require("express");
const app = express();
const crypto = require("crypto");

let port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const demoUuid4 = "00000000-8000-4000-0000-000000000000";

let todoList = [
  { id: demoUuid4, completed: false, task: "read a book" },
  { id: crypto.randomUUID(), completed: false, task: "drink a beer" },
  { id: crypto.randomUUID(), completed: false, task: "learn spanish" },
];
const findItem = function (todoList, itemId) {
  return todoList.find(function (e) {
    return e.id === itemId;
  });
};

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/todo-app", function (req, res) {
  res.render("todo-app", { todoList: todoList });
  console.info(crypto.randomUUID());
});

app.get("/todos", function (req, res) {
  res.render("todo-list", { todoList: todoList });
});

app.get("/todos/:id", function (req, res) {
  const itemId = req.params.id;
  let item = findItem(todoList, itemId);
  res.render("todo-item", { item: item });
});

app.get("/todos/:id/detail", function (req, res) {
  const itemId = req.params.id;
  let item = findItem(todoList, itemId);
  res.render("todo-item-detail", { item: item });
});

app.post("/todos", function (req, res) {
  const newItem = {
    id: crypto.randomUUID(),
    completed: false,
    task: req.body.task,
  };
  todoList.push(newItem);

  res.render("todo-item", { item: newItem });
});

app.patch("/todos/:id/toggle", function (req, res) {
  const itemId = req.params.id;
  let item = findItem(todoList, itemId);
  item["completed"] = !item.completed;

  res.render("todo-item", { item: item });
});

app.delete("/todos/:id", function (req, res) {
  const itemId = req.params.id;
  todoList = todoList.filter(function (e) {
    return e.id !== itemId;
  });
  res.send("");
});

app.get("/todos/:id/edit", function (req, res) {
  const itemId = req.params.id;
  let item = findItem(todoList, itemId);

  res.render("todo-item-edit", { item: item });
});

app.patch("/todos/:id", function (req, res) {
  const itemId = req.params.id;
  let item = findItem(todoList, itemId);
  item.task = req.body.task;

  res.render("todo-item", { item: item });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
