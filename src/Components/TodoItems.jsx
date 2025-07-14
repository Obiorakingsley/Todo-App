import React from "react";
import checked from "../assets/images/checked.png";
import unchecked from "../assets/images/unchecked.png";
import del from "../assets/images/delete.png";

const TodoItems = () => {
  return (
    <main className="main">
      <div className="todo-item">
        <div className="item">
          <img src={checked} alt="" width="18" />
          <p>Hello</p>
        </div>
        <img src={del} alt="" width="22" />
      </div>
    </main>
  );
};

export default TodoItems;
