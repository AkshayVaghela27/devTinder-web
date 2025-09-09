import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { BASE_URL } from '../utils/constants'
import { useNavigate } from 'react-router-dom'
import UserCard from './UserCard'
import axios from 'axios'

const EditProfile = ({ user }) => {
    const { firstName, lastName } = user
    const [age, setage] = useState(user.age || "")
    const [skills, setskills] = useState(user.skills || []);
    const [skillInput, setSkillInput] = useState("");
    const [error, seterror] = useState("")
    const [photourl, setphotourl] = useState(user.photourl || "")
    const [about, setabout] = useState(user.about || "")
    const [gender, setgender] = useState(user.gender || "")
    const [toast, settoast] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleEditData = async () => {
        seterror("")
        try {
            const res = await axios.put(BASE_URL + '/profile/edit',
                { gender, age, about, photourl },
                { withCredentials: true })

            const updatedUser = { ...user, ...res?.data?.data };
            dispatch(addUser(updatedUser));

            settoast(true)
            setTimeout(() => settoast(false), 3000);
        } catch (err) {
            console.log(err)
            seterror(err.response?.data || "Something went wrong")
        }
    }

    return (
        <>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 my-10 px-4">
                {/* Edit Form */}
                <div className="w-full max-w-md">
                    <div className="card bg-base-300 shadow-md">
                        <div className="card-body">
                            <h2 className="card-title justify-center">Edit Profile</h2>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">First Name</legend>
                                <input type="text" className="input w-full"
                                    value={firstName}
                                    disabled
                                />
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Last Name</legend>
                                <input type="text" className="input w-full"
                                    value={lastName}
                                    disabled
                                />
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Gender</legend>
                                <select
                                    className="select select-bordered w-full"
                                    value={gender}
                                    onChange={(e) => setgender(e.target.value)}>
                                    <option value="" disabled>Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Age</legend>
                                <input type="text" className="input w-full"
                                    value={age}
                                    onChange={(e) => setage(e.target.value)}
                                />
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">About</legend>
                                <textarea className="textarea w-full"
                                    value={about}
                                    onChange={(e) => setabout(e.target.value)}
                                />
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Skills</legend>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        className="input flex-1"
                                        placeholder="Add a skill"
                                        value={skillInput}
                                        onChange={(e) => setSkillInput(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            if (skillInput.trim()) {
                                                setskills([...skills, skillInput.trim()]);
                                                setSkillInput("");
                                            }
                                        }}
                                    >
                                        Add
                                    </button>
                                </div>

                                <div className="mt-2 flex flex-wrap gap-2">
                                    {skills.map((s, i) => (
                                        <span key={i} className="badge badge-outline">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Photo URL</legend>
                                <input type="text" className="input w-full"
                                    value={photourl}
                                    onChange={(e) => setphotourl(e.target.value)}
                                />
                            </fieldset>

                            <p className="text-red-500">{error}</p>

                            <div className="card-actions justify-center my-4">
                                <button className="btn btn-primary w-full" onClick={handleEditData}>
                                    Save Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Live Preview */}
                <div className="w-full max-w-md">
                    <UserCard user={{ firstName, lastName, gender, age, about, photourl }} />
                </div>
            </div>

            {toast &&
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile saved successfully.</span>
                    </div>
                </div>
            }
        </>
    )
}

export default EditProfile
