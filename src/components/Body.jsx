import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch();

  const userData = useSelector((store) => store.user)

  const fetchUser = async () => {

    if (userData) return

    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true
      })
      dispatch(addUser(res.data))
    } catch (err) {
      if (err.status === 401) {
        navigate('/login')
      }
      console.error(err)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Body
