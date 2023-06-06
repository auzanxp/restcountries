import { Route, Routes } from 'react-router-dom';
import Home from './pages/HomeCountry';
import DetailCountry from './pages/DetailCountry';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='results' element={<DetailCountry />} />
      </Routes>
    </>
  );
}

export default App;
