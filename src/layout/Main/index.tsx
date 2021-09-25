import React from "react";
import { css } from "@emotion/css";
import { State } from "type";
import classNames from "classnames";

class CSSMaker {
  static readonly masterMain = (props?: State) => css``;
}

const { masterMain } = CSSMaker;

//! masterMain = row container
function Main() {
  return <main className={masterMain()}></main>;
}

export default Main;
