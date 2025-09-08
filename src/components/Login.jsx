import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import {BASE_URL} from '../utils/constants'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [emailId, setEmailId] = useState("akshay@gmail.com")
  const [password, setPassword] = useState("Akshay@123")
  const [error, seterror] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "login", {
        emailId,
        password
      }, {
        withCredentials: true
      })
      dispatch(addUser(res.data))
      return navigate('/')
    } catch (err) {
      seterror(err?.response?.data)
      console.error(err)
    }
  }

  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body ">
          <h2 className="card-title justify-center">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input type="text" className="input" placeholder=""
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input type="password" className="input" placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <p className='text-red-500' >{error}</p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
