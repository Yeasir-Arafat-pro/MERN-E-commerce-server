import React, { useEffect } from 'react'

import { AiFillDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../features/users/userSlice';


const User = () => {
 const { user, isLoading, error } = useSelector((state) => state.userR);

const dispatch = useDispatch()

console.log(user);



useEffect(()=>{

  dispatch(fetchUser())
},[dispatch])

  return (
    <div className="users">
      <h1>All Users</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Image</th>
            <th>Role</th>
            <th>Banned</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* User data will be mapped here */}
          {!isLoading &&
            !error &&
            user &&
            user.map((user) => (
              <tr key={user._id}>
                <td>
                  <strong>
                    <Link
                      state={user}
                      className="singleUser"
                      to={`/users/${user._id}`}
                    >
                      {user.name}
                    </Link>
                  </strong>
                </td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.phone}</td>
                <td>
                  <img style={{ width: "50px" }} src={user.image} alt="User" />
                </td>
                <td>{user.isAdmin ? "Admin" : "User"}</td>
                <td>{user.isBanned ? "Ban" : "No"}</td>
                <td>
                  <button>
                    <AiFillDelete style={{ color: "red" }} />
                  </button>
                  <button>
                    <CiEdit style={{ color: "green" }} />
                  </button>
                </td>
              </tr>
            ))}
          {isLoading && (
            <tr>
              <td colSpan="8">Loading...</td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan="8">{error}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default User