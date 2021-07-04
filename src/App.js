import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";

// import ReactPaginate from "react-paginate";

function App() {
  const inputField = useRef(null);
  const [userName, setUserName] = useState("");
  const [listOfUsers, setListOfUsers] = useState([]);
  const [curId, setCurId] = useState(undefined);
  const [successAdd, setSuccessAdd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  // Dummy state for checking database change
  const [dataChanged, setDataChanged] = useState(0);

  const createNewUser = async () => {
    setLoading(true);
    try {
      setError("");
      const res = await axios({
        method: "POST",
        url: "http://localhost:8000/users",
        data: { name: userName },
      });
      if (res.data.status === "success") {
        setDataChanged((prev) => prev + 1);
        setSuccessAdd("Successfully added to database");
      }
    } catch (err) {
      setError(err.message);
      console.log("Error when addUser: ", err.message);
    }
    setLoading(false);
  };

  const updateCurrentUser = async (id) => {
    setLoading(true);
    try {
      const res = await axios({
        method: "PATCH",
        url: `http://localhost:8000/users/${id}`,
        data: {
          name: userName,
        },
      });
      if (res.data.status === "success") {
        setDataChanged((prev) => prev + 1);
        setSuccessAdd("Successfully updated in database");
      }
    } catch (err) {
      setError(err.message);
      console.log("Error when updateUser: ", err.message);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (curId !== undefined) {
      setError("");
      updateCurrentUser(curId);
    } else {
      createNewUser();
    }

    setCurId(undefined);
    setSearchValue("");
    setUserName("");
  };

  const handleUserClick = (id) => {
    inputField.current.focus();
    const clickedTodo = listOfUsers.filter((item) => item._id === id)[0];
    setCurId(clickedTodo._id);
    setUserName(clickedTodo.name);
  };

  const removeUser = async (id) => {
    setLoading(true);
    try {
      const res = await axios({
        method: "DELETE",
        url: `http://localhost:8000/users/${id}`,
      });
      if (res.data.status === "success") {
        setDataChanged((prev) => prev + 1);
        setSuccessAdd("Successfully Removed user from database");
      }
    } catch (err) {
      setError(err.message);
      console.log("Error in Deleting user: ", err.message);
    }
    setLoading(false);
  };

  const gotoPrevpage = () => {
    setCurrentPage((prev) => {
      return prev > 1 ? prev - 1 : prev;
    });
  };

  const gotoNextpage = () => {
    setCurrentPage((prev) => {
      return prev < totalPages ? prev + 1 : prev;
    });
  };

  const getAllData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8000/users`);
      setListOfUsers(res.data.data.users);
      setTotalPages(+res.data.data.pages);
      setCurrentPage(+res.data.data.current);
    } catch (err) {
      console.log("Error in Getting all users: ", err.message);
    }
    setLoading(false);
  };

  const handleSearchChange = async (e) => {
    const keyword = e.target.value;
    setSearchValue(keyword);
    if (keyword !== "") {
      try {
        const res = await axios.get(
          `http://localhost:8000/users/search/${keyword}`
        );
        setListOfUsers(res.data.data.users);
        setTotalPages(+res.data.data.pages);
        setCurrentPage(+res.data.data.current);
        console.log(res);
      } catch (err) {
        console.log("Error on Search Value: ", err.message);
        setError(err.message);
      }
    } else {
      getAllData();
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let route = searchValue
          ? `/search/${searchValue}?page=${currentPage}`
          : `?page=${currentPage}`;
        const res = await axios.get(`http://localhost:8000/users${route}`);
        setListOfUsers(res.data.data.users);
        setTotalPages(+res.data.data.pages);
        if (+res.data.data.pages < +res.data.data.current) {
          setCurrentPage(+res.data.data.pages);
        } else {
          setCurrentPage(+res.data.data.current);
        }
      } catch (err) {
        console.log("Error in Getting all users: ", err.message);
      }
      setLoading(false);
    };
    fetchData();
  }, [dataChanged, currentPage, searchValue]);

  // Remove success message after 3s
  useEffect(() => {
    let timer = setTimeout(() => {
      setSuccessAdd("");
      setError("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [successAdd, error]);

  return (
    <div className="App">
      <section className="container">
        {successAdd ? <h1 className="success-message">{successAdd}</h1> : null}
        {error ? <h1 className="error-message">{error}</h1> : null}
        <h1>React Users List</h1>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputField}
            type="text"
            value={userName}
            placeholder="Enter user name: "
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <button type="submit">{curId !== undefined ? "Save" : "Add"}</button>
        </form>
        <input
          type="text"
          placeholder="Search user here..."
          value={searchValue}
          onChange={handleSearchChange}
        />

        {loading && <div className="loading"></div>}

        <div className="todoList">
          <h1>Users</h1>
          <ul>
            {listOfUsers.map((item) => {
              return (
                <li key={item._id}>
                  <span onClick={() => handleUserClick(item._id)}>
                    {item.name}
                  </span>
                  <span onClick={() => removeUser(item._id)}>X</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pagination">
          <ul>
            <li
              onClick={gotoPrevpage}
              className={currentPage < 2 ? "disabled" : ""}
            >
              Prev
            </li>
            <li
              onClick={gotoNextpage}
              className={currentPage >= totalPages ? "disabled" : ""}
            >
              Next
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default App;
