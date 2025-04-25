import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteUser } from '../../features/users/userSlice'
import { Link } from 'react-router-dom'
import { AiFillDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";

const UserTable = ({setSearch,setSortBy,setSortOrder, isLoading, error,user, handleUserAction, handleUpdateUser}) => {
    const dispatch = useDispatch()
  return (
    <table className="table">
    <thead>
      <tr>
        <th>Search:</th>
        <td colSpan={3}>
          <input onChange={(e) => setSearch(e.target.value)} type="text" />
        </td>
        <th>Sort By:</th>
        <td colSpan={2}>
          <select name="sortBy" onChange={(e) => setSortBy(e.target.value)}>
            <option value="createdAt">Created At</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="address">Address</option>
            <option value="phone">Phone</option>
          </select>
        </td>
        <th>Order:</th>
        <td  colSpan={1}>
          <select name="sortOrder" onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </td>
      </tr>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th></th>
        <th>Address</th>
        <th>Phone</th>
        <th>Image</th>
        <th>Role</th>
        <th>Banned</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {!isLoading &&
        !error &&
        user ?
        user.map((user) => (
          <tr key={user._id}>
            <td>
              <strong>
                <Link state={user} className="singleUser" to={`/users/${user._id}`}>
                  {user.name}
                </Link>
              </strong>
            </td>
            <td colSpan={2}>{user.email}</td>

            <td>{user.address}</td>
            <td>{user.phone}</td>
            <td>
              <img style={{ width: "50px" }} src={user.image} alt="User" />
            </td>
            <td>{user.isAdmin ? "Admin" : "User"}</td>
            <td>
              <select
                style={{ color: user.isBanned ? "red" : "green" }}
                value={user.isBanned ? "ban" : "unban"}
                className="userStatus"
                onChange={(e) => handleUserAction(user._id, e.target.value)}
              >
                <option style={{ color: "red" }} value="ban">
                  Ban
                </option>
                <option style={{ color: "green" }} value="unban">
                  Unban
                </option>
              </select>
            </td>
            <td>
              <button onClick={() => dispatch(deleteUser(user._id))}>
                <AiFillDelete style={{ color: "red" }} />
              </button>
              <button className="editBtn" onClick={() => handleUpdateUser(user)}>
                <CiEdit style={{ color: "green" }} />
              </button>
            </td>
          </tr>
        )) :
        <tr>
        <td colSpan="8">Data not found...</td>
      </tr>
        }
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
  )
}

export default UserTable