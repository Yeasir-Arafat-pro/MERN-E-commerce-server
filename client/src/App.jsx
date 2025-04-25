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
          path: "/users",
          element: <User />,
        },

        {
          path: "/create-user",
          element: <CreateUser />,
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
          path: "/auth/login",
          element: <Login />,
        },
        {
          path: "/auth/logout",
          element: <Logout />,
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



      ]
    }

   
      
  ])

  return (
    <div className="dashboard">

      



    <RouterProvider router={router} />
  
    <footer>
      <div className="form">
        <form action="">
          <label htmlFor="subscribe">Subscribe to newsletter:</label>
          <input
            type="email"
            name="subscribe"
            id="subscribe"
            placeholder="Enter Your Email"
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
      <div>&copy; Copyright 2025 Yeasir Express</div>
    </footer>
  </div>
  
  )
}

export default App;