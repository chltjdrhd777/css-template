import React from "react";
import { Link } from "react-router-dom";

function NavList() {
  return (
    <ul className="nav-list">
      <li className="nav-item">
        <Link to="/">Home</Link>
      </li>

      <li className="nav-item">
        <Link to="/menu">Menu</Link>
      </li>

      <li className="nav-item">
        <Link to="/reservations">Reservations</Link>
      </li>
      <li className="nav-item">
        <Link to="/news">news</Link>
      </li>

      <li className="nav-item">
        <Link to="/shop">shop</Link>
      </li>

      <li className="nav-item">
        <Link to="/contact">contact</Link>
      </li>
    </ul>
  );
}

export default NavList;
