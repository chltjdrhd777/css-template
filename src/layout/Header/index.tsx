import React from "react";
import { css } from "@emotion/css";
import { Link } from "react-router-dom";
import NavList from "layout/Header/NavList";
import { CssProp } from "type";

class CSSMaker {
  static readonly masterHeader = (props?: CssProp) => css``;
}

const { masterHeader } = CSSMaker;

function Header() {
  return (
    <header className={masterHeader()}>
      <div className="container">
        <nav>
          <NavList />
        </nav>
      </div>
    </header>
  );
}

export default Header;
