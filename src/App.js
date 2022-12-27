import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Tags from './Pages/Tags';
import Contests from './Pages/Contests';
import Practice from './Pages/Practice';
import Analysis from './Pages/Analysis';
import Blogs from './Pages/Blogs';
import ContestSearch from './Pages/ContestSearch';
import {UserContextProvider} from './Context/user-context'
import UnsolvedContests from './Pages/UnsolvedContests';


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
    <Route path = "/blogs" element={<Blogs />} />
    <Route path = "/searchcontest" element={<ContestSearch />} />
    <Route path= "/unsolvedcontest" element={<UnsolvedContests />} />
    {/* <Route path="*" element={<NotFound />} />  */}
    </Routes>
    </UserContextProvider>
    
    </>
  );
}

export default App;
