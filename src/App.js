import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from './components/Create'
import Update from './components/Update'
import Read from './components/Read'
import { useEffect, useState } from "react";
import  axios  from "axios";


function App() {

  const [users,setUsers]=useState([]);

   const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
   
    
useEffect(()=>{
  axios.get('http://localhost:3001/users')
  .then((res)=>{
    console.log(res.data);
    setUsers(res.data)
    
  })
  .catch((err)=>console.log(err)
  )
})
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create newId={newId}/>} />
            <Route path="/update/:id" element={<Update/>} />
            <Route path="/read/:id" element={<Read/>} />
            
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
