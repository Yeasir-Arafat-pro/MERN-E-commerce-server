import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch and useSelector
import { Navigate, useNavigate } from 'react-router-dom'; // Import useNavigate
import { loginUser } from '../../features/auth/authSlice';
import "./login.css"
import { useAuth } from '../../components/useContext/AuthContext';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Import useNavigate to handle navigation
  const dispatch = useDispatch();




  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser({ email, password })); // Dispatch the loginUser action with email and password
    navigate('/'); // Navigate to the user page after successful login

  };

  return (
    <div className='loginContainer'>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;