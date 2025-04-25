import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { verifyRegisterToken } from '../../features/users/userSlice';

const UserRegisterVerify = () => {
  const { success, error } = useSelector((state) => state.userR); 
  const navigate = useNavigate();
  const { token } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyToken = async () => {
      try {
         await dispatch(verifyRegisterToken({ token }));
     
      } catch (error) {
        console.error(error.message);
        toast.error("An error occurred during verification.");
      }
    };
    verifyToken();
  }, [token, dispatch, navigate]);

  useEffect(() => {
    if (success) {
      navigate("/auth/login", { replace: true }); // Navigate to login on success
    } else if (error) {
      toast.error(error.message || 'Verification failed!');
    }
  }, [success, error, navigate]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default UserRegisterVerify;