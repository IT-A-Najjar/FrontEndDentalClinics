import React from 'react';
import './App.css'
import { Link, Route, Routes, } from 'react-router-dom';
const Navbar = ({ addPath, showPath, addElement, showElement }) => {
  return (
    <nav className='navbar'>
      <ul>

        <li>
          <Link to={addPath} className='anchor'>
            إضـــافة 
          </Link>
        </li>
        <li>
          <Link to={showPath} className='anchor'>
            عــــرض
          </Link>
        </li>
      </ul>
      <Routes>
        <Route path={addPath} element={addElement} />
        <Route path={showPath} element={showElement} />
      </Routes>
    </nav>
  );
};

export default Navbar;
