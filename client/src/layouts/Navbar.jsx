import React, {  useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import {  useSelector } from 'react-redux';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);
  const {isLoggedIn} = useSelector(state=> state.auth)
  const token = Cookies.get('accessToken')

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleMenu = (menu) =>
    setOpenMenu(openMenu === menu ? null : menu);


  return (

<div className='dashboard'>

    <header className="top-navbar">
      <div className="logo">
        <a href="/">MyApp</a>
      </div>
      <nav className="top-nav-links">
        <a href="/profile">Profile</a>
        <a href="/settings">Settings</a>
        {isLoggedIn 
        ? 
        <a href="/auth/logout">Logout</a>
        :
        <a href="/auth/login">Login</a>
      }
      </nav>
    </header>

    <div className="sidebar-container">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? "Close" : "Menu"}
      </button>
      <nav className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <NavLink to="/" className="nav-link">Dashboard</NavLink>
        <div className="nav-section">
          <div className="nav-section-title" onClick={() => toggleMenu("users")}>
            Users
          </div>
          {openMenu === "users" && (
            <div className="nav-submenu">
              <NavLink to="/dashboard/admin/users">All Users</NavLink>
              <NavLink to="/create-user">Create User</NavLink>
              <NavLink to="/dashboard/admin/ban-users">Banned Users</NavLink>
              <NavLink to="/users/pending">Pending Users</NavLink>
            </div>
          )}
        </div>
        <div className="nav-section">
          <div className="nav-section-title" onClick={() => toggleMenu("products")}>
            Products
          </div>
          {openMenu === "products" && (
            <div className="nav-submenu">
              <NavLink to="/products">All Products</NavLink>
              <NavLink to="/products/create">Create Product</NavLink>
              <NavLink to="/products/update">Update Product</NavLink>
              <NavLink to="/products/delete">Delete Product</NavLink>
            </div>
          )}
        </div>
        <NavLink to="/categories" className="nav-link">Categories</NavLink>
        <NavLink to="/cart" className="nav-link">Cart</NavLink>
      </nav>
    </div>

    <main className='mainContent'>
       <Outlet/>
    </main>

    <footer className="footer">
      <div className="footer-logo">
        <img src="/path/to/logo.png" alt="Logo" />
      </div>
      <form className="newsletter-form">
        <label htmlFor="subscribe">Subscribe to newsletter:</label>
        <input
          type="email"
          name="subscribe"
          id="subscribe"
          placeholder="Enter Your Email"
        />
        <button type="submit">Subscribe</button>
      </form>
      <p>&copy; 2025 MyApp. All rights reserved.</p>
    </footer>
</div>

  );
};

export default Navbar;
