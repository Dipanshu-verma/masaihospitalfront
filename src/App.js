import logo from './logo.svg';
import './App.css';
import Signup from "./components/Signup.jsx"
import { Routes,Route, Link, Navigate } from 'react-router-dom';
import Onboard from './components/Onboard.jsx';
import Dashboard from './components/Dashboard.jsx';
import { useState } from 'react';
function App() {
  const token  =  localStorage.getItem("token");
 
const [Token,setToken] =  useState(token?true:false);
  return (
    <div>
    <div>
      <Link to="/">Login</Link>
      <Link to="/onboard">Onbaord</Link>
      <Link to="/dashboard">Dashboard</Link>
    </div>
 <Routes>
   
   <Route path='/'  element={<Signup setToken={setToken}/>}  />
   <Route path='/onboard'  element={ !Token ? <Navigate  to="/"/>:<Onboard/>}  />
   <Route path='/dashboard'  element={ !Token ? <Navigate  to="/"/>:<Dashboard/>}  />

 </Routes>
      
    </div>
  );
}

export default App;
