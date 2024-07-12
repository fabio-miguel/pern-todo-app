import React from "react";
import { useSelector } from "react-redux";

const TodoModal = () => {
  const { openModalId, todos } = useSelector((store) => {
    console.log(store);
  });
  const todo = todos.find((todo) => todo.id === openModalId);

  if (!todo) return null;

  return (
    <div className="modal" style={{ display: "block" }}>
      {" "}
      {/* Adjust styling as needed */}
      <div className="modal-content">
        <p>{todo.description}</p>
        {/* More modal content here */}
      </div>
    </div>
  );
};

export default TodoModal;
