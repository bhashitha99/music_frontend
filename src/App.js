import logo from './logo.svg';
import './App.css';
import {Home} from './pages/index';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
      </Routes>

    </div>
  );
}

export default App;
