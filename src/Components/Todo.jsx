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
      id: todo.length,
    };

    setTodo((prev) => {
      return [...prev, newTodo];
    });
    setInputText("");
  }

  function deleteTodo(id) {
    setTodo((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  }
  //Uncheck/Check items
  function toggleChecked(id) {
    setTodo(
      todo.map((item) => {
        return item.id === id
          ? { ...item, isComplete: !item.isComplete }
          : item;
      })
    );
  }

  //Loop through todos Array
  const todos = todo.map((todo, index) => {
    return (
      <TodoItems
        text={todo.text}
        key={index}
        toggleChecked={() => {
          toggleChecked(todo.id);
        }}
        isComplete={todo.isComplete}
        deleteTodo={() => {
          deleteTodo(todo.id);
        }}
      />
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
