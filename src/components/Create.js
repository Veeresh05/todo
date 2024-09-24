import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Create = ({newId}) => {
  
  const [values, setValues] = useState({
    
     name: "",
     email: "",
   });

   

  

 

  

  const navigate = useNavigate();

  

  

  

  const handleSubmit = (e) => {
    e.preventDefault();

    

    axios
      .post("http://localhost:3001/users", values)
      .then((res) => {
        console.log(res.data, values);

        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex w-75 ms-5 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-5 pb-5 rounded">
        <h1>Add a User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="enter your  name"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="enter your email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <button className="btn btn-success ms-3">Submit</button>
          <Link to="/" className="btn btn-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Create;
