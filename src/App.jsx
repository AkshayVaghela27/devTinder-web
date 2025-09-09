import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from "./components/Login"
import Profile from "./components/Profile"
import Body from './components/Body'
import Feed from './components/Feed'
import { Provider } from 'react-redux'
import appStore from "./utils/appStore"
import Connections from './components/Connections'
import Requests from './components/Requests'

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body/>}>
          <Route path="/" element={<Feed/>}/>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/connections" element={<Connections/>}></Route>
          <Route path="/requests" element={<Requests/>}></Route>
        </Route>
      </Routes>
      </BrowserRouter>
      </Provider>
  )
}

export default App
