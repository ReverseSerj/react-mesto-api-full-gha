import React from 'react';
import { NavLink, Route, Routes } from "react-router-dom"
import logo from '../images/logo_mesto.svg';
 
function Header({onSignOut, headerEmail}) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип сайта Mesto Russia"/>
      <Routes>
        <Route 
          exact
          path="/sign-in" 
          element={
            <nav className="header__nav">
              <NavLink to="/sign-up" className="header__link">Регистрация</NavLink>
            </nav>
          }
        /> 
        <Route 
          exact
          path="/sign-up" 
          element={
            <nav className="header__nav">
              <NavLink to="/sign-in" className="header__link">Войти</NavLink>
            </nav>
          }
        /> 
        <Route 
          exact
          path="/"
          element={
            <nav className="header__nav">
              <p className="header__email">{headerEmail}</p>
              <NavLink to="/sign-in" className="header__link" onClick={onSignOut}>Выйти</NavLink>
            </nav>
          }
        />
      </Routes>
    </header>
  )
}

export default Header;