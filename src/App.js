import React from "react";
import { Route, Switch } from "react-router-dom";

import MovieRankPage from "../src/pages/MovieRankPage";
import Meta from "./components/Meta";

const App = () => {
  return (
    <div className="container">
      <Meta />

      <Switch>
        {/* Path 파라미터로 카테고리 값을 받는 페이지 구성 */}
        {/* ":변수이름?"에서 물음표는 해당 변수가 선택적이라는 의미 */}
        <Route path="/:targetDt?" component={MovieRankPage}></Route>
      </Switch>
    </div>
  );
};

export default App;
