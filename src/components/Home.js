import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setFilterData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = (term) => {
    if (term) {
      setFilterData(
        data.filter((item) => item.name.toLowerCase() === term.toLowerCase())
      );
    } else {
      setFilterData(data); // Reset to full data when search term is cleared
    }
  };

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, data]);

  const navigate = useNavigate();
  const handleDelete = (id) => {
    const confirm = window.confirm("would you like to Delete");
    if (confirm) {
      axios
        .delete("http://localhost:3001/users/" + id)
        .then((res) => {
          window.location.reload();
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-40">
        <h3>List of Users</h3>
        {data && data.length > 0 ? (
          <div className="w-75 rounded bg-white border shadow p-4">
            <div className="d-flex justify-content-center">
              <input
                className="shadow rounded form-control w-25 me-3 "
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <button className="btn btn-warning ">search</button>
            </div>

            <div className="d-flex justify-content-end ">
              <Link to={"/create"} className="btn btn-success">
                Add +
              </Link>
            </div>

            <table className="table table-stipend ">
              <thead>
                <tr>
                  <th>id </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filterData &&
                  filterData.map((d, index) => (
                    <tr key={d.id}>
                      <td>{index + 1}</td>
                      <td>{d.name}</td>
                      <td>{d.email}</td>
                      <td>
                        <Link
                          to={`/read/${d.id}`}
                          className="btn  btn-success me-2 "
                        >
                          Read
                        </Link>
                        <Link
                          to={`/update/${d.id}`}
                          className="btn  btn-primary me-2 "
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(d.id)}
                          className="btn  btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No available data...</p>
        )}
      </div>
    </>
  );
};

export default Home;
