import React, { useCallback } from "react";
import css from "./css";

function Main() {
  //@ css part
  const wrapper = useCallback(css, []);
  const { masterMain } = wrapper();
  //@ /////

  return <main className={masterMain()}></main>;
}

export default Main;
