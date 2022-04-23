import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Nav from './components/nav';
import Header from './components/header';
import Home from './pages/main/home';
import Chat from './pages/main/chat';

function App() {
  return (
    <div className="App w-screen h-screen flex items-center justify-center bg-[#fff] dark:bg-green-900 ">
     <div className="phone w-[400px] h-[98%] border-[5px] border-slate-600 rounded-3xl overflow-y-auto relative">
        <Header />
        <Router>
          <Routes>
            <Route exact path='/'  element={<Home />} />
            <Route path='/chat' element={<Chat/>} />
          </Routes>
        </Router>
        <Nav />
     </div>
    </div>
  );
}

export default App;
