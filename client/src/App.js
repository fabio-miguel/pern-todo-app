import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

// Components

import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";

const baseUrl =
  process.env.REACT_APP_ECS_SERVICE_URL || `http://localhost:5000`;

function App() {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await axios.get(`${baseUrl}/todos`);

      setTodos(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${baseUrl}/todos/${id}`);

      getTodos();
    } catch (err) {
      console.error(err.message);
    }
  };

  // Ensures getTodos is called when the component mounts.
  useEffect(() => {
    getTodos();
  }, []);

  // Re-fetch todos after adding a new one
  const handleAddTodo = () => {
    getTodos();
  };

  // // Optimistically update a todo's description & re-fetch todos
  const onUpdateTodo = async (id, newDescription) => {
    // Temporarily store the current state in case we need to revert
    const oldTodos = [...todos];
    console.log(newDescription);
    console.log(id);

    // Optimistically update the UI
    const updatedTodos = oldTodos.map((todo) => {
      if (todo.id === id) {
        console.log("Found the todo to update");
        return { ...todo, description: newDescription };
      }
      return todo;
    });
    setTodos(updatedTodos);
    try {
      // Attempt to update the todo on the server
      await axios.put(`${baseUrl}/todos/${id}`, {
        description: newDescription,
      });
      console.log("Todo description updated successfully on the server.");
    } catch (err) {
      console.error(err.message);
      // Revert to the old todos if the server call fails
      setTodos(oldTodos);
    }
  };

  return (
    <Fragment>
      <div className="container">
        <InputTodo onAddTodo={handleAddTodo} />
        <ListTodos
          todos={todos}
          deleteTodo={deleteTodo}
          onUpdateTodo={onUpdateTodo}
        />
      </div>
    </Fragment>
  );
}

export default App;
