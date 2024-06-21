import React, { Fragment, useState } from "react";
import axios from "axios";

const baseUrl =
  process.env.REACT_APP_ECS_SERVICE_URL || `http://localhost:5000`;

const InputTodo = ({ onAddTodo }) => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      await axios.post(`${baseUrl}/todos/`, body);

      onAddTodo(); // Re-fetch todos after adding a new one
      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Pern Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          id="todoInput"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success" id="addTodoBtn">
          Add
        </button>
      </form>
    </Fragment>
  );
};

export default InputTodo;

/*
The ecsServiceUrl is the DNS address of your server / api endpoint. The backend configuration uses a Load Balancer, so DNS URL will be found in the Load Balancer. However, if you decide to use a custom domain (e.g. using Route 53), then simply use this. 
*/
