import React from "react";
import { Link } from "react-router-dom";

function NavList() {
  return (
    <ul className="nav-list">
      <li className="nav-item">
        <Link to="/download">Download</Link>
      </li>

      <li className="nav-item">
        <Link to="/why">Why Discord</Link>
      </li>

      <li className="nav-item">
        <Link to="/nitro">Nitro</Link>
      </li>
      <li className="nav-item">
        <Link to="/safety">Safety</Link>
      </li>

      <li className="nav-item">
        <Link to="/support">Support</Link>
      </li>

      <li className="nav-item">
        <Link to="/contact">contact</Link>
      </li>
    </ul>
  );
}

export default NavList;
