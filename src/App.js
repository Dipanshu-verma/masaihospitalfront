import logo from './logo.svg';
import './App.css';
import Signup from "./components/Signup.jsx"
import { Routes,Route } from 'react-router-dom';
import Onboard from './components/Onboard.jsx';
import Dashboard from './components/Dashboard.jsx';
function App() {
  return (
    <div>
 <Routes>
   
   <Route path='/'  element={<Signup/>}  />
   <Route path='/onboard'  element={<Onboard/>}  />
   <Route path='/dashboard'  element={<Dashboard/>}  />

 </Routes>
      
    </div>
  );
}

export default App;
