import React from "react";

//페이지 이동 기능 사용하기(1)
import { withRouter } from "react-router-dom";

//페이지 이동 기능 사용하기(3) --> 컴포넌트의 props에 포함되어 전달되는 history객체 선언
const Top = ({ history, match }) => {
  console.group("Top");
  console.debug(match);
  console.groupEnd();

  /**
   * 날짜의 선택값이 변경된 경우 호출될 이벤트 핸들러
   */
  const onDateChange = (e) => {
    e.preventDefault();

    //route 모듈의 페이지 이동 기능 활용
    //이 컴포넌트가 <Route>에 의해 호출되는 형태가 아니므로 'withRouter'를 통해서만 history를 받을 수 있다.
    history.push("/" + e.currentTarget.value);
  };

  return (
    <div>
      {/* bootstarp 메뉴바, 색상변경, 상단 고정*/}
      <nav className="navbar navbar-inverse navbar-fixed-top">
        {/* 메뉴 안에서의 컨텐츠 영역 넓이 조정*/}
        <div className="container">
          {/* 로고 + 모바일 메뉴 버튼*/}
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar-collapse"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">
              BoxOffice
            </a>
          </div>
          {/* 메뉴 영역*/}
          <div className="collapse navbar-collapse" id="navbar-collapse">
            {/* 우측 폼 영역 */}
            <form className="navbar-form navbar-right">
              <div className="form-group" style={{ marginRight: "10px" }}>
                <input
                  type="date"
                  className="form-control"
                  placeholder="날짜선택"
                  onChange={onDateChange}
                  defaultValue={match.params.targetDt}
                ></input>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};
//페이지 이동 기능 사용하기(2)
export default withRouter(Top);
