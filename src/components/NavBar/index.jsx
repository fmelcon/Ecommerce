import React from "react";
import CartWidget from "../CartWidget";
import "./styles.scss";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="header">
      <div className="container">
        <NavLink exact to="/" className="header__logo btn">
          <span>E-commerce</span>
        </NavLink>

        <ul className="header__navbar">
          <NavLink to={`/category/relojes`} className="btn">
            <li>Relojes</li>
          </NavLink>
          <NavLink to={`/category/lentes`} className="btn">
            <li>Lentes</li>
          </NavLink>

          <Link to="/cart" className="header__cart">
            <CartWidget />
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default NavBar;
