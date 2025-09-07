import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from "./Login"
import Profile from "./Profile"
import Body from './Body'

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body/>}>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
