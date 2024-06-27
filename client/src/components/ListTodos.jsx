import React, { Fragment } from "react";
import EditTodo from "./EditTodo";

const ListTodos = ({ todos, deleteTodo, onUpdateTodo }) => {
  console.log(todos);
  console.log("---------------");
  return (
    <Fragment>
      {" "}
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={`${todo.id}`}>
              <td data-testid="todo-description">{todo.description}</td>
              <td>
                <EditTodo todo={todo} onUpdateTodo={onUpdateTodo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  id="deleteBtn"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
