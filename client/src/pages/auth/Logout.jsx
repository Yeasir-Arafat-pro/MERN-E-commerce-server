import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Import useNavigate to handle navigation  
    useEffect(() => {
        dispatch(logoutUser()); // Dispatch the logoutUser action to log out the user
        navigate('/auth/login'); // Redirect to the home page after logout
    }, [dispatch, navigate]); // Add dispatch and navigate to the dependency array

    return null;
}

export default Logout