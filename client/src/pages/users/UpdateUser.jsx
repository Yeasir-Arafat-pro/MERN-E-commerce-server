import React, {  useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {Navigate, useLocation } from 'react-router-dom'
import './createUser.css'; 
import { updateUserById } from '../../features/users/userSlice';

const UpdateUser = () => { 
  const {state} = useLocation()
  const {isEdit, updateUser} = state || {isEdit: false, updateUser: null}
    const [userData, setUserData] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
      setUserData({
        name: isEdit ? updateUser.name : '',
        address: isEdit ? updateUser.address : '',
        phone: isEdit ? updateUser.phone : '',
      })
    }, [isEdit, updateUser])

    

    const handleChange = (e) => {
        const { name, value, files } = e.target;
            setUserData({ ...userData, [name]: name === 'image' ? files[0] : value });
    }
  
    const handleSubmit =  (e) => {
      e.preventDefault();
      
       dispatch(updateUserById({userId: updateUser._id, userData}));
    };
    
  return (
    <div className="createUserContainer">
      <h1 className="formTitle">🧑‍💻 Create New User</h1>
      <form onSubmit={handleSubmit} className="userForm">
        <div className="formGroup">
          <label htmlFor="name">Full Name</label>
          <input
            onChange={handleChange}
            type="text"
            id="name"
            name="name" value={userData.name}
            placeholder="John Doe"
            required
          />
        </div>
        {/* <div className="formGroup">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            id="password"
            name="password" value={userData.password}
            placeholder="********"
            required
          />
        </div> */}
        <div className="formGroup">
          <label htmlFor="address">Address</label>
          <input onChange={handleChange}
            type="text"
            id="address"
            name="address" value={userData.address}
            placeholder="123 Street, City"
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="phone">Phone</label>
          <input onChange={handleChange}
            type="tel"
            id="phone"
            name="phone" value={userData.phone}
            placeholder="+8801XXXXXXXXX"
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="image">Profile Image</label>
          <input  onChange={handleChange} type="file" id="image" name="image" />
        </div>
        <button type="submit" className="submitBtn">
          Create User
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
