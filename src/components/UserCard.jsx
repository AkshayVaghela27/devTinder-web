import React from 'react'
import { useDispatch } from 'react-redux'
import { BASE_URL } from "../utils/constants"
import { removeUserFromFeed } from '../utils/feedSlice'
import axios from 'axios'

const UserCard = ({ user }) => {
    const { _id, firstName, lastName, age, gender, about, photourl } = user

    const dispatch = useDispatch()

    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {},
                { withCredentials: true })
            dispatch(removeUserFromFeed(userId))
        } catch (err) {
            console.error(err.response.data)
        }
    }

    return (
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img
                    src={photourl}
                    alt="photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-center my-2">
                    <button className="btn btn-secondary"
                        onClick={() => { handleSendRequest("ignored", _id) }}>
                        Ignore</button>
                    <button className="btn btn-primary"
                    onClick={() => {handleSendRequest("interested",_id)}}>Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard
