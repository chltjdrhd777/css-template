# CSS template2 테스트버전

> 이것은 어떻게하면 더욱 효과적으로 css를 분리하며 접근성을 높이고
>
> 이에 따른 불필요한 랜더링을 최소할 수 있겠는가 하는 연구에서 비롯된 테스트버전입니다(copyright@devAnderson)

- the point to look

해당 프로젝트가 타입스크립트로 되어있음을 주목, class와 emotion을 접합시켜보려 했는데,
readonly 옵션이 오로지 타입스크립트에서만 돌아가는 것을 생각하면 다른 방향으로 가는 것이 낫겠다고 판단했습니다
그리고 class도 함수긴 하지만, 불필요한 리랜더링을 막기 위한 키포인트로 사용할 _useCallback_ 이 class 함수객체에서는 사용이 불가능한 것을 보고 결국 함수형이면서 클로져를 활용하는 방향으로 가면 어떨까 했습니다.

아직은 클로져는 구현을 하지 못했지만, useCallback의 활용이라는 점에서는 충분히 되었다고 생각하고 있습니다
일단 대표적인 큰 형태로 본다면

- Layout
  - Header
    - css.ts (emotion의 css함수 파트)
    - index.tsx (메인 컴포넌트)
    - another.tsx (메인 컴포넌트에서 의미적으로 분리된 부분)

## > css.ts

```js
import { CssProp } from "type";
import { css } from "@emotion/css";

const cssFrame = () => {
  // 각각의 파트는 css탬플릿 함수를 이용하여 해당 css 내용과 <=> 리턴되는 임의 css 끼리 연결되는 고리를 만들어줍니다.

  // 이 css가 리턴하는 랜덤 클래스네임을 컴포넌트의 어트리뷰트인 className에 할당할 경우, 또다르게 기호화된 css 클래스가 만들어지며 최종적으로 할당됩니다.
  const masterHeader = (props?: CssProp) => css`
    height: 50%;
    background-color: black;

    & .test {
      height: 300px;
      background-color: yellow;
    }
  `;

  const testContainer = (props?: CssProp) => css`
    background-color: pink;
  `;

  return {
    masterHeader,
    testContainer,
  };
};

export default cssFrame;
```

## > index.tsx

```js
import React, { useCallback } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import NavList from "layout/Header/NavList";
import Logo from "assets/images/logo.svg";
import { useState } from "react";
import HeaderCSS from "./css";

function Header() {
  const [testState, setTestState] = useState(true);

  //@ css part
  // wrapper은 useCallback을 감싸주는 부분입니다
  // 이 wrapper의 안쪽 내용물은 매번 랜더링때마다 다시 평가되는 것을 조금 더 효율적으로 만들어보고자 useCallback으로 감싸주게 되었습니다

  // classNames는 클래스이름을 만들어주는 패키지입니다
  // 해당 패키지를 사용한 이유는, 리엑트의 삼항 연산자를 이용한 조건부 클래스명이 너무 지저분하게 길어져서 분리하고 싶었던 마음도 있고,
  // 무엇보다도 "condition && "test" 와 같이 클래스명을 조건부로 붙이게 되면
  // 지저분한 false가 생성되는 것을 원치 않았기 때문에 활용하게 되었습니다
  //classNames는 간단하게 저렇게 args를 나열해주면 알아서 falsy한 값들은 ignorea하고, 유효한 값을 남겨 띄어쓰기 기준으로 클래스이름을 만들어줍니다
  // wrapper 함수를 실행시키면, 리턴되는 것은 css들을 props의 조건에 따라서 탬플릿 안의 스트링값을 변경하는 함수들을 담은 객체를 리턴하고, 이 객체들을 구조분해하여 const로 할당하였습니다.

  //따라서 해당 방법은 두가지의 conditional css를 다룰 수 있습니다
  //1. wrapper에서 리턴되는 함수값에 전달되는 prop으로 조건부 css를 만들 수 있습니다
  //2. classNames의 방법을 통해 css를 추가해줌으로서 컨디셔널한 css 를 만들 수 있습니다.
  const wrapper = useCallback(HeaderCSS, []);
  const { masterHeader, testContainer } = wrapper();
  const TestContainer = classNames(testContainer(), testState && "test");
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
```

emotionCSS는 styled comonent를 이용하여 theme으로부터 prop을 받아 스타일을 조건부로 변경할 수 있습니다.
하지만, 그 방법을 쓰지 않고 emotion css를 이용한 단축화된 inline을 이용하려는 이유가 몇개 있습니다

---

a. styled component의 관습상 대문자로 시작하는 컴포넌트 형태이기에, 구조적으로 이게 styled 컴포넌트인지 일반 컴포넌트인지 구분이 되지 않는 불편함이 있었습니다.

b. css 탬플릿 구조 내부에서 theme을 사용하기 위해 불필요하게 props를 구조분해를 계속 해야하는 불편함이 있었습니다. 거기에 attribute이라는 형태로 컴포넌트에 모든 조건부요소를 적어야 하기 때문에 조건이 늘어나면 늘어날수록 컴포넌트의 길이가 길어져서 보기가 불편한 단점이 있었습니다. 여기에 더해서 이것은 개인적인 문제였습니다만 typescript를 이용할 경우, attribute의 타입을 정할 때에도 일일이 모든 조건부 내용들을 타입으로 추가해야 했기 때문에, 견고함을 더했을 수는 있겟으나 복잡함을 피해갈 수가 없었습니다.

---

따라서, 기존의 styled-component에서 사용했던 방법을 답습하지 않고, 다른 방법을 이용하고자 생각한 것이 emotion의 inline css 형태이며, 여기서 _css_ 메소드를 익명함수로 래핑하여 거기에 인자를 보낸다면 조건부 형태의 css를 실현할 수 있으리라 생각했습니다.

결과적으로, 최종적인 사용 방법은 이렇습니다

1. 클래스명이 중복이 가능하다는 문제점을 역이용, 오히려 공통적으로 사용할 클래스명에 대한 것만 classNames로 합쳐서 설정합니다.
   (마치 부트스트랩처럼, 예를들어 .container, .w-20 와 같은 전 컴포넌트가 공통분모처럼 사용할 css에 대해서 클래스명으로 정리)
   (이 내용 중에서 .container와 같이 틀을 잡는것에 해당하는 css는 global.tsx로,)
   (비슷한 형태를 띄기 때문에 하나로 모을 수 있다면 예를들어 .h-30, .w-20 와 같은 종류들은 각 이름을 가진 스타일로 따로 저장해도 좋을 듯 합니다)

2. 조건부의 css가 필요하다면, 인자로 해당 조건에 대한 state가 담긴 객체를 전달합니다. 즉, 한 컴포넌트 내에는 하나의 상태만 존재하며(useReducer를 활용해도 좋겠습니다. Redux와 비슷한 형태로 갑니다), 해당 state의 내부에 담긴 상태중 하나가 변경됬을 때, 이를 감지하여 css 메소드의 탬플릿 부분이 변경되는 방식을 취합니다.

해당 방법을 통한 장점으로는, css는 무조건 css 메소드로 정형화된 하나의 랜덤 클래스 이름으로 세팅되기 때문에, 중복에 대한 염려가 없으며 구체적으로 정해져있는 메소드가 한 파일당 하나로 결정되어 있기 때문에 해당 내용을 찾을 때에도 용이합니다.
