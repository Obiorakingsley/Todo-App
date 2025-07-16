import React, { useEffect, useState } from "react";
import listicon from "../assets/images/list.png";
import TodoItems from "./TodoItems";
import Confetti from "react-confetti";

const Todo = () => {
  const [todo, setTodo] = useState(loadFromStorage() || []);
  const [inputText, setInputText] = useState("");

  //Load items from localStorage
  function loadFromStorage() {
    const storedItems = localStorage.getItem("todo");
    return JSON.parse(storedItems) || "[]";
  }

  //Save items to localStorage
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  //Get text from input
  function handleChange(event) {
    const text = event.target.value;
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

  ///Delete Todo

  function deleteTodo(id) {
    setTodo((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  }

  //"Enter" button adds todo
  function enterButton(event) {
    if (event.key === "Enter") {
      addTodo();
    }
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

  //Checks if todos are completed
  const completed = todo.every((item) => item.isComplete);

  //Loop through todos Array
  const todos = todo.map((todo) => {
    return (
      <TodoItems
        text={todo.text}
        key={todo.id}
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
      {completed && todo.length > 0 && (
        <Confetti recycle={false} numberOfPieces={800} />
      )}
      <header className="header">
        <nav className="navbar">
          <img src={listicon} alt="" width="40" height="40" />
          <h1>To-Do List</h1>
        </nav>
        <div className="todo-input">
          <input
            onChange={handleChange}
            onKeyDown={enterButton}
            type="text"
            value={inputText}
          />
          <button onClick={addTodo}>Add</button>
        </div>
      </header>
      {todos}
    </div>
  );
};

export default Todo;
