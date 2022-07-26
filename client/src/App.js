import './App.css';
import { useEffect,useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Nav from './components/nav';
import Header from './components/header';
import Home from './pages/main/home';
import Chat from './pages/main/chat';
import Messanger from './pages/main/messenger';
import Login from './pages/main/login';
import Signup from './pages/main/signup';
import VerifyAccount from './pages/main/verifyAccount';
import Search from './pages/main/search';
import Profile from './pages/main/Profile';
import PostPage from './pages/main/PostPage';

function App() {
  const [show,setShow] = useState(true)
  const hideFunc = ()=>{
    setShow(false)
  }
  return (
    <div className="App w-screen h-screen flex items-center justify-center bg-[#fff] dark:bg-white ">
     <div className="phone w-[400px] h-[98%] border-[5px] border-slate-600 rounded-3xl overflow-y-auto relative">
        {show !== false && <Header /> }
        <Router>
          <Routes>
            <Route exact path='/'  element={<Home />} />
            <Route path='/chat' element={<Chat/>} />
            <Route path='/chat/message/:id' element={<Messanger/>}/>
            <Route path='/Login' element={<Login hide={hideFunc}/>} />
            <Route exact path='/signup' element={<Signup hide={hideFunc}/>} />
            <Route path='/auth/verification' element={<VerifyAccount hide={hideFunc}/>}/>
            <Route path='/search' element={<Search/>}/>
            <Route path='/profile' element={<Profile/>} />
            <Route path='/post' element={<PostPage/>} />
          </Routes>
        </Router>
        {show !== false && <Nav />}
     </div>
    </div>
  );
}

export default App;
