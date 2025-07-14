import React from "react";
import listicon from "../assets/images/list.png";
import TodoItems from "./TodoItems";

const Todo = () => {
  return (
    <div className="todo-container">
      <header className="header">
        <nav className="navbar">
          <img src={listicon} alt="" width="40" height="40" />
          <h1>To-Do List</h1>
        </nav>
        <div className="todo-input">
          <input type="text" />
          <button>Add</button>
        </div>
      </header>
      <TodoItems />
    </div>
  );
};

export default Todo;
