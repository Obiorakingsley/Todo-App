import React, { useState } from "react";
import listicon from "../assets/images/list.png";
import TodoItems from "./TodoItems";

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [inputText, setInputText] = useState("");

  //Get text from input
  function handleChange(event) {
    const text = event.target.value.trim();
    setInputText(text);
  }

  //Add Todo
  function addTodo() {
    if (inputText === "") {
      return null;
    }
    const newTodo = {
      text: inputText,
      isComplete: false,
      id: Date.now(),
    };

    setTodo((prev) => {
      return [...prev, newTodo];
    });
    setInputText("");
  }

  //Loop through todos Array
  const todos = todo.map((todo) => {
    return (
      <TodoItems text={todo.text} key={todo.id} isComplete={todo.isComplete} />
    );
  });

  return (
    <div className="todo-container">
      <header className="header">
        <nav className="navbar">
          <img src={listicon} alt="" width="40" height="40" />
          <h1>To-Do List</h1>
        </nav>
        <div className="todo-input">
          <input onChange={handleChange} type="text" value={inputText} />
          <button onClick={addTodo}>Add</button>
        </div>
      </header>
      {todos}
    </div>
  );
};

export default Todo;
