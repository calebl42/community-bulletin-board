import './App.css';
import Home from './pages/Home.tsx';
import { Routes, Route } from 'react-router';

function App() {
  
  return (
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  )
}

export default App;
