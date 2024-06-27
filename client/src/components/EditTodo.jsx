import React, { Fragment, useState } from "react";

const EditTodo = ({ todo, onUpdateTodo }) => {
  const [description, setDescription] = useState(todo.description);

  // Edit description function
  const updateDescription = async (e, id, newDescription) => {
    e.preventDefault();
    await onUpdateTodo(id, newDescription);
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
                onClick={(e) => updateDescription(e, todo.id, description)}
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
