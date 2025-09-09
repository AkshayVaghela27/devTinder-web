import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { BASE_URL } from '../utils/constants'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [firstName, setfirstName] = useState("")
  const [lastName, setlastName] = useState("")
  const [emailId, setEmailId] = useState("")
  const [password, setPassword] = useState("")
  const [error, seterror] = useState("")
  const [isLogin, setIslogin] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async () => {
    seterror("")
    try {
      const res = await axios.post(BASE_URL + "/login", {
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

  const handleSignUp = async () => {
    seterror("")
    try {
      const res = await axios.post(BASE_URL + '/signup', { firstName, lastName, emailId, password },
        { withCredentials: true })
      dispatch(addUser(res.data.data))
      return navigate('/profile')
    } catch (err) {
      seterror(err?.response?.data)
      console.error(err)
    }
  }

  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body ">
          <h2 className="card-title justify-center">{isLogin ? "Login" : "SignUp"}</h2>
          {!isLogin && <>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input type="text" className="input" placeholder=""
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>
              <input type="text" className="input" placeholder=""
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
              />
            </fieldset>
          </>
          }
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
            <button className="btn btn-primary" onClick={isLogin ? handleLogin : handleSignUp}>{isLogin ? "login" : "signup"}</button>
          </div>
          <p className='text-center' onClick={() => setIslogin(value => !value)}>
            {isLogin ? "New User? SignUp Here" : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
