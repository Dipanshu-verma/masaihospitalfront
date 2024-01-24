import logo from './logo.svg';
import './App.css';
import Signup from "./components/Signup.jsx"
import { Routes,Route, Link, Navigate } from 'react-router-dom';
import Onboard from './components/Onboard.jsx';
import Dashboard from './components/Dashboard.jsx';
function App() {
  const token  =  localStorage.getItem("token");

  return (
    <div>
    <div>
      <Link to="/">Login</Link>
      <Link to="/onboard">Onbaord</Link>
      <Link to="/dashboard">Dashboard</Link>
    </div>
 <Routes>
   
   <Route path='/'  element={<Signup/>}  />
   <Route path='/onboard'  element={ token ? <Navigate  to="/"/>:<Onboard/>}  />
   <Route path='/dashboard'  element={<Dashboard/>}  />

 </Routes>
      
    </div>
  );
}

export default App;
