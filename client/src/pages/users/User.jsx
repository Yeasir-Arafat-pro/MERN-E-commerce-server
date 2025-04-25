
import React, { useEffect, useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';


import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, fetchUser, userStatusAction } from '../../features/users/userSlice';
import './user.css'
import UserTable from '../../components/users/UserTable';
import Pagination from '../../components/app/Pagination';


const User = () => {
  const [updateUser, setUpdateUser] = useState(null);
const [isEdit, setIsEdit] = useState(false);
 const { user, pagination, isLoading, error } = useSelector((state) => state.userR);
const dispatch = useDispatch()
const navigate = useNavigate()

// pagination
const limits  = 20
const [currentPage, setCurrentPage] = useState(pagination.currentPage || 1);
const [totalPages, setTotalPages] = useState(pagination.totalPages);
const [search, setSearch] = useState('');
//sort
const [sortBy, setSortBy] = useState(''); // Add sort state
const [sortOrder, setSortOrder] = useState('asc'); // Add sort order state

useEffect(() => {
  dispatch(fetchUser({ page: currentPage, limit: limits, search, sortBy, sortOrder }))

  if(isEdit){
    navigate("/update-user", {replace: true, state: {isEdit, updateUser}});
  }
},[dispatch, isEdit, currentPage, search, sortBy, sortOrder, navigate, updateUser])


const handleUpdateUser = (user) => {
  setUpdateUser(user);
  setIsEdit(true);
  
}

const handleUserAction = async (userId, action) => {
  try {
    const result = await dispatch(userStatusAction({ userId, action }));
    if (result.meta.requestStatus === 'fulfilled') {
      // Handle success response if needed
      toast.success(`User ${action}ed successfully`);
    } else {
      // Handle error response if needed
      toast.error(`Error updating user status: ${result.error.message}`);
      
    }
  } catch (error) {
    console.error(error);
    
  }
};


useEffect(() => {
  // ডেটা/সার্চ সম্পন্ন হলে:
  setTimeout(() => {
    document.querySelector('.table').classList.add('visible');
  }, 200);
}, [user, search,  sortBy, sortOrder]);
  return (
           <div className='userContainer'>
      <section className="users">

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          pauseOnFocusLoss
        />

        <h1>List Of Users</h1>
        <UserTable setSearch={setSearch} setSortBy={setSortBy} setSortOrder={setSortOrder} isLoading={isLoading} error={error} user={user}  handleUserAction={handleUserAction} handleUpdateUser={handleUpdateUser} />


        {/* pagination */}
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}
        pagination={pagination}  totalPages={totalPages} />
      </section>

    </div>
  );
}

export default User