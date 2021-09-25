import { State } from "type";
import { css } from "@emotion/css/macro";

const cssFrame = () => {
  const masterHeader = (props?: State) => css`
    height: 50%;
    background-color: black;

    & .test {
      height: 300px;
      background-color: yellow;
    }
  `;
  const testContainer = (props?: State) => css`
    background-color: ${props?.test ? "green" : "yellow"};
  `;

  return {
    masterHeader,
    testContainer,
  };
};

export default cssFrame;
