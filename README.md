# 14-movie-rank

## #01. 프로젝트 생성

```shell
yarn create react-app 14-movie-rank
```

### 1) 추가 패키지 설치

프로젝트를 VSCode로 열고, `Ctrl` + `~`를 눌러 터미널 실행

```shell
yarn add react-router-dom
yarn add qs
yarn add node-sass
yarn add styled-components
yarn add axios
yarn add redux
yarn add react-redux
yarn add redux-actions
yarn add redux-devtools-extension
yarn add redux-logger
yarn add redux-thunk
yarn add react-bootstrap
yarn add bootstrap@3
yarn add moment           //(시간관련 라이브러리, 의존적이지 않다 /*react, vue 등 사용가능*/)
yarn add react-moment    
yarn add moment-timezone //(영어권)
yarn add chart.js
yarn add react-chartjs-2
yarn add react-loader-spinner
yarn add react-helmet
```

그래프 라이브러리 - D3.js, chart.js

### 2) 프로젝트 생성 후 기초작업

1. **src폴더** 하위에서 App.css와 index.css, logo.svg 삭제

1. **App.js** 파일에서 App.css와 logo.svg에 대한 참조(import) 구문 제거

1. **index.js** 파일에서 index.css에 대한 참조(import) 구문 제거

1. index.js 파일에서 다음의 구문 추가

   ```js
   import { BrowserRouter } from 'react-router-dom';
   ```

1. index.js 파일에서 `<App />`을 `<BrowserRouter><App /></BrowserRouter>`로 변경

1. App.js 파일에 다음을 추가

   ```js
   import { Route, NavLink, Switch } from "react-router-dom";
   ```

   혹은

   ```js
   import { Route, Link, Switch } from "react-router-dom";
   ```

## 3) 프로젝트 실행

프로젝트를 VSCode로 열고, `Ctrl` + `~`를 눌러 터미널 실행

```shell
yarn start
```

---------------

## #02. 리덕스 스토어 구성하기

> 앞 단원에서 정리한 내용을 간략하게 정리한 형태 입니다. (내용은 동일)

### 1) 기능별 모듈(Reducer)을 결합할 준비

#### /src/modules/index.js

폴더와 파일을 직접 생성한다.

```js
import { combineReducers } from 'redux';

export default combineReducers({
    // 앞으로 추가될 모듈들이 이 위치에서 리덕스에 추가된다.
});
```

### 2) 리덕스 스토어 구성하기

### /src/index.js

#### 1) 리덕스를 위한 참조 추가

```js
/** 리덕스를 위한 참조 추가 */
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import rootReducer from './modules';
```

#### 2) 리덕스 스토어 생성

```js
/** 리덕스 스토어 생성 */
const logger = createLogger();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, ReduxThunk)));
```

#### 3) 렌더링 처리

렌더링 처리를 `<Provider store={store}>` 태그로 감싼다.

```js
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
```

---

**css 파일에서 반드시 class만 사용!** 

-> ID 값은 사용하지 말자!

inline css 지양

> style 파일 (2)

> style 파일 -> module  파일이름.module.css (1)

scss, scss module ( 효율성이 좋지만..익숙하지가...)

styledComponent

---

#### 박스오피스 api 키

` 제공 서비스 > 제공 서비스 ` **일별 박스 오피스 ** API 스팩 확인

api 키 : d6e4f46ea4f3910bb14f62340e2d9f19



http://www.kobis.or.kr/kobisopenapi/homepg/apiservice/searchServiceInfo.do



#### 요청 주소



#### 인터페이스 

---

### ajax  자체가 비동기 이므로

실행순서는 

`화면 출력 -> Ajax 연동 -> 화면 갱신`

> 화면에 출력할 기본값을 미리 준비하지 않을 경우 Ajax의 결과를 화면에 출력하면 에러가 발생하는 경우가 많다.
>
> 1. 모듈 쪽에서 Ajax 결과에 대한 구조를 미리 잡아준다.
> 2. 컴포넌트쪽에서 defaultProps를 사용하여 기본값을 지정
>
> 두가지 방법을 둘 다 쓰는 것을 권장!

---

### SEO 검색엔진 최적화

#### 1) react-helmet

#### 2) ssr

react 페이지를 물리적인 서버에 올린다

  next.js (react+node)

---

