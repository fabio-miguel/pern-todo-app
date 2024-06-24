import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";
import axios from "axios";

const baseUrl =
  process.env.REACT_APP_ECS_SERVICE_URL || `http://localhost:5000`;

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
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {todos.map((todo) => (
            <tr key={`${todo.id}`}>
              <td data-testid="todo-description">{todo.description}</td>
              <td>
                <EditTodo todo={todo} onUpdateTodo={onUpdateTodo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
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
