import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../features/users/userSlice';
import './createUser.css';

const CreateUser = () => {
  const { register } = useSelector((state) => state.userR);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setUserData({ ...userData, [name]: name === 'image' ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, address, phone, image } = userData;
    try {
      const result = await dispatch(createUser({ name, email, password, address, phone, image }));
      if (result.meta.requestStatus === 'fulfilled') {
        setIsSuccess(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (isSuccess && register?.payload?.token) {
      navigate(`/register-verify/${register.payload.token}`, { replace: true });
    }
  }, [isSuccess, register, navigate]);

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
            name="name"
            value={userData.name}
            placeholder="John Doe"
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            id="email"
            name="email"
            value={userData.email}
            placeholder="john@example.com"
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            id="password"
            name="password"
            value={userData.password}
            placeholder="********"
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="address">Address</label>
          <input
            onChange={handleChange}
            type="text"
            id="address"
            name="address"
            value={userData.address}
            placeholder="123 Street, City"
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="phone">Phone</label>
          <input
            onChange={handleChange}
            type="tel"
            id="phone"
            name="phone"
            value={userData.phone}
            placeholder="+8801XXXXXXXXX"
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="image">Profile Image</label>
          <input onChange={handleChange} type="file" id="image" name="image" />
        </div>
        <button type="submit" className="submitBtn">
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;