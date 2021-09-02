import React from "react";
import { css } from "@emotion/css";
import { Link } from "react-router-dom";
import NavList from "layout/Header/NavList";
import { CssProp } from "type";
import Logo from "assets/images/logo.svg";

class CSSMaker {
  static readonly masterHeader = (props?: CssProp) => css``;
}

const { masterHeader } = CSSMaker;

function Header() {
  return (
    <header className={masterHeader()}>
      <nav>
        <Link to="/" className="logo">
          <img src={Logo} alt="" />
        </Link>

        <NavList />
      </nav>
    </header>
  );
}

export default Header;
