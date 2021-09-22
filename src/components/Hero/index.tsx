import React, { useCallback, useState } from "react";
import SectionCss from "./css";

function Section() {
  //@ css part
  const wrapper = useCallback(SectionCss, []);
  const { masterSection } = wrapper();
  //@ /////

  return <section></section>;
}

export default Section;
