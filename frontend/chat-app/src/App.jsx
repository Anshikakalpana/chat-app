
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import Loginemail from './Loginemail'
import Loginnumber from './Loginnumber'
import Profile from './Profile';
import Navbar from './components/Navbar'
import Dashboard from './Dashboard';
import { authcheck } from './patanhi/authEv'
import { useEffect } from 'react'
import Signup from './Signup'
import {Loader} from "lucide-react"

const App=() =>{

const {authUser , checkAuth , isRefreshing, onlineUsers}=authcheck();
console.log({onlineUsers})
useEffect(()=>{
  checkAuth();

}, []);

console.log({authUser})

if( isRefreshing ) return (
  <div><Loader className="size-10 animate-spin"/></div>
)
  return (

    <>
    <Navbar/>
    <Routes>
      {/* <Route path ="/" element={authUser? <HomePage/> : <Navigate to="/login"/>}/> */}
       <Route path ="/signup" element={ <Signup/>}/>
         <Route path ="/loginemail" element={<Loginemail/> }/>
          <Route path ="/loginnumber" element={<Loginnumber/> }/>
          {/* <Route path ="/settings" element={authUser? <Settings/> : <Navigate to="/login"/>}/>  */}
          <Route path ="/profile" element={authUser? <Profile/> : <Navigate to="/loginemail"/>}/>
          <Route path ="/dashboard" element={authUser? <Dashboard/> : <Navigate to="/loginemail"/>}/>
    </Routes>
    </>
  )
}

export default App
