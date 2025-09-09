import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequests } from '../utils/requestSlice'

const Requests = () => {

    const requests = useSelector((store) => store.requests)

    const dispatch = useDispatch()

    const reviewRequest = async (status , _id) => {
        try{
            const res = axios.post(BASE_URL + "/request/review/" + status + "/" + _id ,{},
                {withCredentials:true})
            dispatch(removeRequests(_id))
        }catch(err){
            console.error(err.response.data)
        }
    }

    const fetchRequest = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/request/received", { withCredentials: true })
            dispatch(addRequests(res.data.data.connectionRequest))
        } catch (err) {
            console.error(err.response.data)
        }
    }

    useEffect(() => {
        fetchRequest()
    }, [])

    if (!requests) return null;

    if (requests.length === 0)
        return (
            <h1 className="text-center text-2xl font-semibold mt-10 text-gray-500">
                No requests Found
            </h1>
        );

    return (
        <div className="mt-10">
            <h1 className="text-center text-3xl font-bold text-white mb-8">
                Requests
            </h1>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
                    {requests.map((request) => {
                         if (!request.fromUserId) return null;
                        const { _id, firstName, lastName, about, photourl } = request.fromUserId;
                        return (
                            <div
                                key={request._id}
                                className="card bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center hover:shadow-2xl transition duration-300"
                            >
                                <img
                                    src={photourl}
                                    alt="profile"
                                    className="w-28 h-28 rounded-full object-cover border-4 border-blue-100 shadow-md"
                                />
                                <h2 className="mt-4 text-lg font-semibold text-gray-800">
                                    {firstName + " " + lastName}
                                </h2>
                                <p className="mt-2 text-gray-600 text-center text-sm">{about}</p>
                                <div className="flex gap-4 mt-4">
                                    <button className="btn btn-primary"
                                    onClick={() => reviewRequest("rejected",request._id)}>
                                        Reject
                                    </button>
                                    <button className="btn btn-secondary"
                                    onClick={() =>reviewRequest("accepted",request._id)}>
                                        Accept
                                    </button>
                                </div>
                            </div>

                        );
                    })}
                </div>
            </div>
        </div>
    );

}

export default Requests
