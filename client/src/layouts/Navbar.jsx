import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleMenu = (menu) =>
    setOpenMenu(openMenu === menu ? null : menu);

  return (
    <>

    <div style={{ display: 'flex' }}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      <nav className={`sidebar ${isOpen ? ' open' : ' closed'}`}>
        <NavLink to="/" className="nav__link">Dashboard</NavLink>

        <div className="nav__section">
          <div className="nav__section-title" onClick={() => toggleMenu('users')}>
            Users
          </div>
          {openMenu === 'users' && (
            <div className="nav__submenu">
              <NavLink to="/users">All Users</NavLink>
              <NavLink to="/create-user">Create User</NavLink>
              <NavLink to="/users/ban">Banned User</NavLink>
              <NavLink to="/users/pending">Pending User</NavLink>
            </div>
          )}
        </div>

        <div className="nav__section">
          <div className="nav__section-title" onClick={() => toggleMenu('products')}>
            Products
          </div>
          {openMenu === 'products' && (
            <div className="nav__submenu">
              <NavLink to="/products">All Products</NavLink>
              <NavLink to="/products/create">Create Product</NavLink>
              <NavLink to="/products/update">Update Product</NavLink>
              <NavLink to="/products/delete">Delete Product</NavLink>
              <NavLink to="/products/featured">Featured Product</NavLink>
            </div>
          )}
        </div>

        <div className="nav__section">
          <div className="nav__section-title" onClick={() => toggleMenu('categories')}>
            Categories
          </div>
          {openMenu === 'categories' && (
            <div className="nav__submenu">
              <NavLink to="/categories">All Categories</NavLink>
              <NavLink to="/categories/create">Create Category</NavLink>
              <NavLink to="/categories/update">Update Category</NavLink>
              <NavLink to="/categories/delete">Delete Category</NavLink>
              <NavLink to="/categories/featured">Featured Category</NavLink>
            </div>
          )}
        </div>

        <NavLink to="/cart" className="nav__link">Cart</NavLink>
        <NavLink to="/register" className="nav__link">Register</NavLink>
        <NavLink to="/auth/login" className="nav__link">Login</NavLink>
        <NavLink to="/auth/logout" className="nav__link">Logout</NavLink>
      </nav>


      <main style={{ flex: 1, padding: '1rem' }}>
        <Outlet />
      </main>
    </div>

    </>
  );
};

export default Navbar;
