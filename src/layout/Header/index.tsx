import React, { useCallback } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import NavList from "layout/Header/NavList";
import Logo from "assets/images/logo.svg";
import { useState } from "react";
import HeaderCSS from "./css";

function Header() {
  const [testState, setTestState] = useState({ test: true });

  //@ css part
  const wrapper = useCallback(HeaderCSS, []);
  const { masterHeader, testContainer } = wrapper();
  //const TestContainer = classNames(testContainer(), testState && "test");
  const TestContainer = classNames(testContainer(testState));
  //@ /////

  return (
    <header className={masterHeader()}>
      <nav>
        <Link to="/" className="logo">
          <img src={Logo} alt="" />
        </Link>

        <div className={TestContainer}>hello it is test</div>

        <NavList />
      </nav>
    </header>
  );
}

export default Header;
