import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Tags from './Pages/Tags';
import Contests from './Pages/Contests';
import Practice from './Pages/Practice';
import Analysis from './Pages/Analysis';

import {UserContextProvider} from './Context/user-context'


function App() {
  return (
    <>
    <UserContextProvider>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/tags" element={<Tags />} />
    <Route path="/contests" element={<Contests />} />
    <Route path="/practice" element={<Practice />} />
    <Route path="/analysis" element={<Analysis />} />
    {/* <Route path="*" element={<NotFound />} />  */}
    </Routes>
    </UserContextProvider>
    
    </>
  );
}

export default App;
