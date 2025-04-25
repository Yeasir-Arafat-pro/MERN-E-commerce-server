import React, { useEffect } from 'react'
import {  useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { verifyRegisterToken } from '../../features/users/userSlice';

const UserRegisterVerify = () => {
  const navigate = useNavigate()
  const {token} = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await dispatch(verifyRegisterToken({token}))
      } catch (error) {
        console.log(error.message)
      }
    }
    verifyToken()
    navigate('/auth/login', {replace: true})
  }, [dispatch, token])
  

}

export default UserRegisterVerify