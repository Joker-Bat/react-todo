import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const inputField = useRef(null);
  const [userName, setUserName] = useState("");
  const [listOfUsers, setListOfUsers] = useState([]);
  const [curId, setCurId] = useState(undefined);
  const [successAdd, setSuccessAdd] = useState(false);
  const [error, setError] = useState("");

  // const getLocalStorageTodos = () => {
  //   const todos = JSON.parse(localStorage.getItem("todos"));
  //   if (todos) {
  //     setListOfUsers(todos);
  //   }
  // };

  // const setLocalStorageTodos = (todos) => {
  //   const jsonTodos = JSON.stringify(todos);
  //   localStorage.setItem("todos", jsonTodos);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (curId !== undefined) {
    //   const clickedTodoIndex = listOfUsers.findIndex((c) => {
    //     return c.id === curId;
    //   });
    //   const currentTodos = [...listOfUsers];
    //   currentTodos[clickedTodoIndex].todo = userName;
    //   setListOfUsers(currentTodos);
    //   // setLocalStorageTodos(currentTodos);
    //   setCurId(undefined);
    // } else {
    //   setListOfUsers((prev) => {
    //     const updatedTodos = [...prev, { id: prev.length, todo: userName }];
    //     // setLocalStorageTodos(updatedTodos);
    //     return updatedTodos;
    //   });
    // }
    try {
      setSuccessAdd(false);
      setError("");
      const res = await axios({
        method: "POST",
        url: "http://localhost:8000/users",
        data: { name: userName },
      });
      console.log(res.data);
      if (res.data.status === "success") setSuccessAdd(true);
    } catch (err) {
      setError(err.message);
      console.log("Error when addUser: ", err.message);
    }

    setUserName("");
  };

  const deleteTodo = (id) => {
    setListOfUsers((prev) => {
      const filteredTodos = prev.filter((todo) => {
        return todo.id !== id;
      });
      // setLocalStorageTodos(filteredTodos);
      return filteredTodos;
    });
  };

  const handleTodoClick = (id) => {
    inputField.current.focus();
    const clickedTodo = listOfUsers.filter((item) => item.id === id)[0];
    setCurId(clickedTodo.id);
    setUserName(clickedTodo.todo);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8000/users");
      console.log(res.data);
    };

    fetchData();
    // getLocalStorageTodos();
  }, [successAdd]);

  return (
    <div className="App">
      <section className="container">
        {successAdd ? <h1>Successfully Added to database</h1> : null}
        {error ? <h1>{error}</h1> : null}
        <h1>React Users List</h1>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputField}
            type="text"
            value={userName}
            placeholder="Enter user name: "
            onChange={(e) => setUserName(e.target.value)}
          />
          <button type="submit">{curId !== undefined ? "Save" : "Add"}</button>
        </form>

        <div className="todoList">
          <h1>Your Todos</h1>
          <ul>
            {listOfUsers.map((item) => {
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
