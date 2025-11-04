
import './App.css'
import { Routes , Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { authcheck } from './patanhi/authEv'
import { useEffect } from 'react'
const App=() =>{
  
const {authUser , checkAuth}=authcheck();
useEffect(()=>{
  checkAuth();

}, [checkAuth]);

console.log({authUser})
  return (

    <>
    <Navbar/>
    <Routes>
      <Route path ="/" element={<HomePage/>}/>
    </Routes>
    </>
  )
}

export default App
