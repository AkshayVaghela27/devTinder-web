import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true,
            });
            dispatch(addConnections(res.data.data));
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) return null;

    if (connections.length === 0)
        return (
            <h1 className="text-center text-2xl font-semibold mt-10 text-gray-500">
                No Connections Found
            </h1>
        );

    return (
        <div className="mt-10">
            <h1 className="text-center text-3xl font-bold text-white mb-8">
                Connections
            </h1>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
                    {connections.map((connection) => {
                        const { _id, firstName, lastName, about, photourl } = connection;
                        return (
                            <div
                                key={_id}
                                className="card bg-white shadow-md rounded-2xl p-6 flex flex-col items-center hover:shadow-xl transition duration-300"
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
                            </div>
                        );
                    })}
                </div>
            </div>
            </div>
            );
};

            export default Connections;
