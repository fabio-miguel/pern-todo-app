import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../redux/features/modalSlice";

const EditTodo = ({ todo, onUpdateTodo, index }) => {
  const [description, setDescription] = useState(todo.description);
  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    (store) => store.modal.openModalId === todo.id
  );

  const updateDescription = async (e, id, newDescription) => {
    e.preventDefault();
    await onUpdateTodo(id, newDescription);
    dispatch(closeModal());
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning editBtn"
        onClick={() => dispatch(openModal(todo.id))}
        data-toggle="modal"
        data-target={`#id${todo.id}`}
        id={`editBtn-${index}`}
        data-todo-id={todo.id}
      >
        Edit
      </button>

      {isModalOpen && (
        <div
          className="modal"
          id={`id${todo.id}`}
          onClick={() => setDescription(todo.description)}
        >
          {/* Modal content */}
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
                  onClick={() => dispatch(closeModal())}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default EditTodo;
