import React from "react";
import PropTypes from "prop-types";

import Top from "../components/Top";

/** Ajax 연동을 위한 Module기능의 호출은 pages안에서만 수행!!*/

// 'react-redux'패키지에서 제공하는 hook함수
import { useSelector, useDispatch } from "react-redux";

//모듈 기능 참조
import * as movieRankModule from "../modules/MovieRank";

import MovieRankChart from "../components/MovieRankChart";
import MovieRankList from "../components/MovieRankList";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import style from "../assets/css/style.module.css";

const MovieRankPage = ({ match }) => {
  console.group("MovieRankPage");
  console.debug("targetDt >> " + match.params.targetDt);
  console.groupEnd();

  /** Hook 기능을 통해 리덕스 상태값 가져오기 */
  const { result, loading, error } = useSelector((state) => {
    console.log(state);
    return {
      ...state.movieRankModule,
    };
  });

  /** action함수를 dispatch 시키기 위한 기능 가져오기*/
  const dispatch = useDispatch();

  /** match 값이 변겨오딜 때만 실행되는 hook 정의*/
  //여기서 모듈에 정의해 놓은 thunk함수를 dispatch하면 redux의 액션 함수다 실행되면서 상태값을 갱신하게 된다.
  React.useEffect(() => {
    const { targetDt } = match.params;
    dispatch(movieRankModule.movieRankAsync(targetDt));
  }, [match]);

  return (
    <div className={style.containerTop}>
      <Top />

      {loading && (
        <Loader
          type="Bars"
          color="#00BFFF"
          height={100}
          width={100}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            marginLeft: "-50px",
            marginTop: "-50px",
          }}
        />
      )}

      <div className="row">
        <div className="col-sm-6">
          <MovieRankChart
            chartData={result.chartData}
            targetDt={match.params.targetDt}
          />
        </div>
        <div className="col-sm-6">
          <MovieRankList
            boxOfficeList={result.boxOfficeResult.dailyBoxOfficeList}
          />
        </div>
      </div>
    </div>
  );
};
export default MovieRankPage;
