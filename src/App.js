import './App.css';
import Landing from './components/Landing/Landing';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import { useLocation } from 'react-router-dom';
import Detail from './components/Detail/Detail';
import Creator from './components/Creator/Creator';
import axios from 'axios';
axios.defaults.baseURL = 'https://api-pokemon-viwg.onrender.com/';

function App() {
  const location = useLocation()

  return (
    <div className="App">
          {location.pathname !== "/" && <Nav/>}
      <Routes>
        <Route path = '/' element = {<Landing/>}/>
        <Route path = '/home' element = {<Home/>}/>
        <Route path = '/detail/:id' element = {<Detail/>}/>
        <Route path="/create" element={<Creator />} />
      </Routes>
    </div>
  );
}
export default App;
