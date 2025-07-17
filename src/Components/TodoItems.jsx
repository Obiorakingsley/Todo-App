import React, { useRef, useState } from "react";
import checked from "../assets/images/checked.png";
import unchecked from "../assets/images/unchecked.png";
import del from "../assets/images/delete.png";
import edit from "../assets/images/edit.png";

const TodoItems = (props) => {
  const { text, isComplete, toggleChecked, deleteTodo, editTodo, isEdit } =
    props;

  ///Show more/show full text
  const [showFulltext, setShowFullText] = useState(false);
  let todoText = text;
  if (!showFulltext) {
    todoText = todoText.substring(0, 60);
  }
  function handleShow() {
    setShowFullText((prev) => !prev);
  }

  const checkLenght = text.length > 60;
  const fullText = showFulltext ? (
    <p>show less</p>
  ) : (
    <span className="nowrap">...more</span>
  );

  const completed = isComplete ? checked : unchecked;

  return (
    <div className={isEdit ? "editting item-container" : "item-container"}>
      <div className="item">
        <img
          className="check-complete"
          onClick={toggleChecked}
          src={completed}
          alt="check icon"
          width={20}
          height={20}
        />
        <div className={isComplete ? "todo-text completed" : "todo-text"}>
          {todoText}
          <div onClick={handleShow} className="show">
            {checkLenght && fullText}
          </div>
        </div>
      </div>
      <div className="update-icon">
        <img onClick={editTodo} src={edit} alt="" width="22" height="22" />
        <img
          onClick={deleteTodo}
          className="delete-todo"
          src={del}
          alt="delete icon"
          width="22"
          height="22"
        />
      </div>
    </div>
  );
};

export default TodoItems;
