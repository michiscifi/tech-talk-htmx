"""
FLASK_DEBUG=1  uv run flask --app main run --port=3000 --host=0.0.0.0
FLASK_DEBUG=1  uv run flask --app main run
"""
import uuid
from flask import Flask, abort, render_template, request

app = Flask(__name__)

class Todo(object):
    def __init__(self, task, todo_id=None, completed=False):
        if not todo_id:
            self.id = str(uuid.uuid4())
        else:
            self.id = todo_id
        self.task = task
        self.completed = completed


todos = [
    Todo(
        task="abc",
        todo_id="00000000-8000-4000-0000-000000000000",  # just for easier postman testing
        completed=True,
    ),
    Todo("def"),
    Todo("ghi"),
]


@app.route("/")
def hello_world():
    return render_template("index.html")


@app.route("/todo-app")
def todo_app():
    return render_template("todo/index.html", todos=todos)


@app.route("/todos")
def todo_list():
    return render_template("todo/_list.html", todos=todos)


@app.route("/todos", methods=["POST"])
def todo_create():
    todo = Todo(task=request.form['task'])
    todos.append(todo)
    return render_template("todo/_item.html", todo=todo)


@app.route("/todos/<todo_id>", methods=["DELETE"])
def todo_delete(todo_id):
    for i, todo in enumerate(todos):
        if todo.id == todo_id:
            del todos[i]
    return ""


@app.route("/todos/<todo_id>/edit", methods=["GET"])
def todo_edit(todo_id):
    todo = next(todo for todo in todos if todo.id == todo_id)
    return render_template("todo/_edit.html", todo=todo)


@app.route("/todos/<todo_id>", methods=["PATCH"])
def todo_update(todo_id):
    todo = next(todo for todo in todos if todo.id == todo_id)
    todo.task = request.form['task']
    return render_template("todo/_item.html", todo=todo)


@app.route("/todos/<todo_id>/toggle", methods=["PATCH"])
def toggle(todo_id):
    todo = None
    for e in todos:
        if e.id == todo_id:
            e.completed = not e.completed
            todo = e

    if not todo:
        return abort(404)
    return render_template("todo/_item.html", todo=todo)
