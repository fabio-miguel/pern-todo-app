import React, { Fragment, useState } from "react";
import axios from "axios";

const baseUrl =
  process.env.REACT_APP_ECS_SERVICE_URL || `http://localhost:5000`;

const EditTodo = ({ todo, onUpdateTodo }) => {
  const [description, setDescription] = useState(todo.description);

  // Edit description function
  const updateDescription = async (e) => {
    console.log("Inside updateDescription");
    e.preventDefault();
    console.log("After preventDefault");
    try {
      const body = { description };
      console.log("Before axios.put");
      await axios.put(`${baseUrl}/todos/${todo.id}`, body);
      console.log("Before onUpdateTodo");
      await onUpdateTodo();
      console.log("After onUpdateTodo");
      setDescription(description);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        id="editBtn"
        data-toggle="modal"
        data-target={`#id${todo.id}`}
      >
        Edit
      </button>

      <div
        className="modal"
        id={`id${todo.id}`}
        onClick={() => setDescription(todo.description)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                id="editDoneBtn"
                data-dismiss="modal"
                onClick={(e) => updateDescription(e)}
              >
                Done
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;
