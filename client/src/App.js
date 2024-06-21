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

  // Re-fetch todos after an update
  const onUpdateTodo = async () => {
    await getTodos();
    console.log("Todo Updated");
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
