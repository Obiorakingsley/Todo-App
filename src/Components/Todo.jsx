import React, { useEffect, useState } from "react";
import listicon from "../assets/images/list.png";
import darkListicon from "../assets/images/list_dark.png";
import TodoItems from "./TodoItems";
import Confetti from "../Components/Confetti";
import Light from "../assets/images/light.png";
import Dark from "../assets/images/dark.png";

const Todo = () => {
  const [todo, setTodo] = useState(loadFromStorage() || []);
  const [inputText, setInputText] = useState("");
  const [lightTheme, setLightTheme] = useState(true);

  //Load items from localStorage
  function loadFromStorage() {
    const storedItems = localStorage.getItem("todo");
    return JSON.parse(storedItems) || "[]";
  }

  //Save items to localStorage
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));

    const edit = todo.every((item) => !item.edit);
    edit && setInputText("");
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
      edit: false,
      lastEdited: Date.now(),
    };

    setTodo((prev) => {
      return [newTodo, ...prev];
    });
    setInputText("");
  }

  ///Delete Todo

  function deleteTodo(id) {
    setTodo((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  }

  //Edit Todo

  function editTodo(id, text) {
    setTodo((prev) => {
      return prev.map((item) => {
        !item.edit ? setInputText(text) : setInputText("");
        return item.id === id
          ? { ...item, edit: !item.edit }
          : { ...item, edit: false };
      });
    });
  }

  //Update Theme

  function handleTheme() {
    setLightTheme((prev) => !prev);
  }

  useEffect(() => {
    !lightTheme
      ? document.body.classList.add("dark-theme")
      : document.body.classList.remove("dark-theme");
  }, [lightTheme]);

  //Save Edit
  function saveEdit() {
    if (!inputText) return;
    setTodo((prev) => {
      const updated = prev.map((item) =>
        item.edit
          ? { ...item, text: inputText, edit: false, lastEdited: Date.now() }
          : item
      );
      return prev === updated
        ? updated
        : updated.sort((a, b) => b.lastEdited - a.lastEdited);
    });

    setInputText("");
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
        lightTheme={lightTheme}
        toggleChecked={() => {
          toggleChecked(todo.id);
        }}
        isComplete={todo.isComplete}
        isEdit={todo.edit}
        editTodo={() => {
          editTodo(todo.id, todo.text);
        }}
        deleteTodo={() => {
          deleteTodo(todo.id);
        }}
      />
    );
  });

  const hasTrue = todo.some((item) => item.edit === true);

  //"Enter" button adds todo
  function enterButton(event) {
    if (event.key === "Enter") {
      updateTodo();
    }
  }

  //Update Todo

  function updateTodo() {
    hasTrue ? saveEdit() : addTodo();
  }

  return (
    <div className="todo-container">
      {completed && todo.length > 0 && <Confetti />}
      <header className="header">
        <nav className="navbar">
          <div className="navbar-left">
            <img
              src={lightTheme ? listicon : darkListicon}
              alt=""
              width="40"
              height="40"
            />
            <h1>To-Do List</h1>
          </div>
          <img
            className="theme-icon"
            onClick={handleTheme}
            src={lightTheme ? Dark : Light}
            alt=""
            width={30}
            height={30}
          />
        </nav>
        <div className="todo-input">
          <input
            onChange={handleChange}
            onKeyDown={enterButton}
            type="text"
            value={inputText}
          />

          <button onClick={updateTodo}>{hasTrue ? "Save" : "Add"}</button>
        </div>
      </header>

      <main>{todos}</main>
    </div>
  );
};

export default Todo;
