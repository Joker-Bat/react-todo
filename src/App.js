import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const inputField = useRef(null);
  const [todoText, setTodoText] = useState("");
  const [listOfTodos, setListOfTodos] = useState([]);
  const [curId, setCurId] = useState(undefined);

  const getLocalStorageTodos = () => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos) {
      setListOfTodos(todos);
    }
  };

  const setLocalStorageTodos = (todos) => {
    const jsonTodos = JSON.stringify(todos);
    localStorage.setItem("todos", jsonTodos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (curId !== undefined) {
      const clickedTodoIndex = listOfTodos.findIndex((c) => {
        return c.id === curId;
      });
      const currentTodos = [...listOfTodos];
      currentTodos[clickedTodoIndex].todo = todoText;
      setListOfTodos(currentTodos);
      setLocalStorageTodos(currentTodos);
      setCurId(undefined);
    } else {
      setListOfTodos((prev) => {
        const updatedTodos = [...prev, { id: prev.length, todo: todoText }];
        setLocalStorageTodos(updatedTodos);
        return updatedTodos;
      });
    }

    setTodoText("");
  };

  const deleteTodo = (id) => {
    setListOfTodos((prev) => {
      const filteredTodos = prev.filter((todo) => {
        return todo.id !== id;
      });
      setLocalStorageTodos(filteredTodos);
      return filteredTodos;
    });
  };

  const handleTodoClick = (id) => {
    inputField.current.focus();
    const clickedTodo = listOfTodos.filter((item) => item.id === id)[0];
    setCurId(clickedTodo.id);
    setTodoText(clickedTodo.todo);
  };

  useEffect(() => {
    getLocalStorageTodos();
  }, []);

  return (
    <div className="App">
      <section className="container">
        <h1>React Todo</h1>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputField}
            type="text"
            value={todoText}
            placeholder="Ithu ok va bro :)"
            onChange={(e) => setTodoText(e.target.value)}
          />
          <button type="submit">{curId !== undefined ? "Save" : "Add"}</button>
        </form>

        <div className="todoList">
          <h1>Your Todos</h1>
          <ul>
            {listOfTodos.map((item) => {
              return (
                <li key={item.id}>
                  <span onClick={() => handleTodoClick(item.id)}>
                    {item.todo}
                  </span>
                  <span onClick={() => deleteTodo(item.id)}>X</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default App;
