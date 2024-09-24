import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/" + id)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h2>Details of User</h2>
        <div className="mb-2">
          <strong>Name :{data.name}</strong>
        </div>
        <div className="mb-2">
          <strong>Email :{data.email}</strong>
        </div>
        <Link to={`/update/${data.id}`} className="btn btn-success me-2">
          Edit
        </Link>
        <Link to={"/"} className="btn btn-primary ">
          {" "}
          Back
        </Link>
      </div>
    </div>
  );
};

export default Read;
