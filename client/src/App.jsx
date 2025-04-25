import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Home from './pages/Home';
import Error from './pages/Error';
import User from './pages/users/User';
import Register from './pages/Register';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import UserProfile from './pages/users/UserProfile';
import CreateUser from './pages/users/CreateUser';
import UserRegisterVerify from './pages/users/UserRegisterVerify';
import UpdateUser from './pages/users/UpdateUser';

import './App.css';
import AdminProtected from './routes/AdminProtected';
import { AuthProvider } from './components/useContext/AuthContext';
import LoginProtected from './routes/LoggedInProtected';
import AllProducts from './pages/products/AllProducts';





function App(){

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/create-user",
          element: <CreateUser />,
        },
        {
          path: "/products",
          element: <AllProducts />,
        },
        {
          path: "/update-user",
          element: <UpdateUser />,
        },
        {
          path: "/register-verify/:token",
          element: <UserRegisterVerify />,
        },
        {
          path: "/users/:id",
          element: <UserProfile />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/auth/logout",
          element: <Logout />,
        },
        // DashBoard/Admin Protected
        {
          path: "/dashboard/admin/",
          element: <AdminProtected />,
          children: [
            {
              path: "users",
              element: <User />,
            },
          ],
        },

        {
          path: "/auth/",
          element: <LoginProtected />,
          children: [
            {
              path: "login",
              element: <Login />,
            },
          ],
        },

        // {
        //   path: "dashboard/admin",
        //   element: <AdminProtected />,
        //   children: [

        //     {
        //       path: "users",
        //       element: <User />,
        //     },

        //   ]
        // },
      ],
    },
  ]);

  return (
    <div>
<AuthProvider>


      

<RouterProvider router={router} />

</AuthProvider>


  

  </div>
  
  )
}

export default App;