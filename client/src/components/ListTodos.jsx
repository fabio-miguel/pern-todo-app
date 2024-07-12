import React, { Fragment } from "react";
import EditTodo from "./EditTodo";

const ListTodos = ({ todos, deleteTodo, onUpdateTodo }) => {
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
          {todos.map((todo, index) => (
            <tr key={`${todo.id}`}>
              <td data-testid="todo-description" data-todo-id={todo.id}>
                {todo.description}
              </td>
              <td>
                <EditTodo
                  todo={todo}
                  onUpdateTodo={onUpdateTodo}
                  index={index}
                />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  id={`deleteBtn-${todo.id}`}
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
