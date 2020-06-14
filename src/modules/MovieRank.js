import { handleActions, createAction } from "redux-actions";
import axios from "axios";
import moment from "moment"; //for 날짜 함수

/** 1) 상태값 - 단순한 json객체. */
const initialstate = {
  loading: false, // 현재 검색중인지 여부 (Ajax 시작시 true로 변경)
  //Ajax 의 결과를 page에서 하위 컴포넌트로 전달할 경우,
  // 컴포넌트로 전달할 json골격의 기본 틀을 명시해야 한다.
  result: {
    //1)모듈 쪽에서 Ajax 결과에 대한 구조를 미리 잡아준다.
    boxOfficeResult: {
      boxOfficeList: [],
    },
    chartData: {
      movieNm: [],
      audiCnt: [],
    },
  },
  error: false, // 에러 발생 여부 (실패시 true로 변경)
};

/** 2) 액션 - 컴포넌트가 겪는 상황을 구분하는 문자열 값 */

// --> 일반적으로 Ajax처리를 수행할 때는 하나의 기능에 3개의 상태값을 든다.
//리스트 가져오기 시작 --> loading값을 true로, result는 비우고, error는 false로 처리
const SEARCH = "MovieRank/SEARCH";
//리스트 가져오기 성공 --> loading값을 false로, result는 채우고, error는 false로 처리
const SEARCH_SUCCESS = "MovieRank/SEARCH_SUCCESS";
//리스트 가져오기 실패 --> loading값을 false로, result는 비우고, error는 true로 처리
const SEARCH_FAILURE = "MovieRank/SEARCH_FAILURE";

// 3) 액션 생성 함수 - 액션 객체를 만들어서 리턴한다.
//ReduxThunk에 의한 비동기 함수안에서 Ajax 처리 후 , 결과를 반환하기 위해 이 함수들을 dispatch한다.
export const searchAction = createAction(SEARCH);
export const searchSuccessAction = createAction(SEARCH_SUCCESS);
export const searchFailureAction = createAction(SEARCH_FAILURE);

// 4) 리듀서를 활용하여 스토어에 연결할 Action 정의하기
export default handleActions(
  {
    //리스트 가져오기 시작 --> loading값을 true로, result는 비우고, error는 false로 처리
    [SEARCH]: (state = initialstate, action) => {
      return {
        ...state,
        loading: true,
        result: initialstate.result,
        error: false,
      };
    },
    //리스트 가져오기 성공 --> loading값을 false로, result는 채우고, error는 false로 처리
    [SEARCH_SUCCESS]: (state = initialstate, action) => {
      return {
        ...state,
        //백엔드에서 전달하는 JSON 데이터 전문은 항상 action.payload로 전달된다.
        //이 값을 통째로 활용할 것인지 일부만 활용할것인지에 따라
        // result에 채워 넣을 값이 결정된다.
        loading: false,
        result: action.payload.result,
        error: false,
      };
    },
    //리스트 가져오기 실패 --> loading값을 false로, result는 비우고, error는 true로 처리
    [SEARCH_FAILURE]: (state = initialstate, action) => {
      return {
        ...state,
        loading: false,
        result: initialstate.result,
        // 백엔드에서 전달하는 JSON 데이터 전문은 항상 action.payload로 전달된다.
        //에러가 발생한 경우 그 원인이 백엔드에 있다면
        //대부분의 백엔드 시스템은 JSON안에 에러 메시지를 포함시켜 전달해 준다.
        // 이 경우 어떤 json key 에 에러 메시지가 저장되어 있는지를 문의하거나 메뉴얼 문서를 통해 확인해야 한다.
        error: action.payload.error,
      };
    },
  },
  initialstate
);

// 5) 비동기 작업을 수행할 함수 정의 (ReduxThunk 적용)
//실제 동작할 함수 하나만 정의.
//이 안에서 상태가 변경되도록 구성
export const movieRankAsync = (targetDt) => async (dispatch) => {
  if (targetDt === undefined || targetDt === "") {
    //검색에 필요한 날짜 변수가 없다면 기본 값(1일전)을 생성해서 처리
    //만약 1일 후로 계산할 경우 --> moment.add(1, 'd);
    targetDt = moment().subtract(1, "d").format("YYYYMMDD");
  } else {
    //검색에 필요한 변수가 있다면 "-" 기호는 삭제
    //전체를 변경할 경우 '/변경할값/gi' 라고 명시 -> 정규표현식 사용
    targetDt = targetDt.replace("/-/gi", "");
  }

  //검색시작  --> loading 값을 true로, result는 비우고 error는 false로 처리
  dispatch(searchAction());

  // 예외처리: try 블록을 실행하는 도중 에러가 발생하면 그 즉시 처리를 중단하고 catch블록으로 제어가 이동한다.
  try {
    //Ajax 연동 결과로 전달되는 JSON 전문은 response.data로 접근할 수 있다.
    const apiUrl = "http://itpaper.co.kr/demo/react/movie_rank.php";
    const response = await axios.get(apiUrl, {
      //연동 규격서에 명시된 요청 변수들 정의
      params: { key: "d6e4f46ea4f3910bb14f62340e2d9f19", targetDt: targetDt },
    });

    //통신 결과를 로그에 출력해 보자!!!
    console.group("통신결과");
    console.log(response);
    console.groupEnd();

    /** 통신 결과 중에서 그래프에 출력하기 위한 값을 추려낸다.*/
    const chartData = { movieNm: [], audiCnt: [] };

    response.data.boxOfficeResult.dailyBoxOfficeList.forEach((v, i) => {
      chartData.movieNm[i] = v.movieNm;
      chartData.audiCnt[i] = v.audiCnt;
    });

    //추려낸 값을 통신 결과에 병합한다.
    response.data.chartData = chartData;
    //여기서 전달하는 파라미터가 action 함수안에서 'action.payload'가 된다.
    dispatch(searchSuccessAction({ result: response.data }));
  } catch (e) {
    // 리스트 가져오기 실패 --> loading 값을 false로, result는 비우고, error는 true로 처리
    // 에러 내용을 로그애 출력해보자!
    console.group("에러내용");
    console.error(e);
    console.groupEnd();
    // 여기서 전달하는 파라미터가 action함수안에서 'action.payload'가 된다.
    dispatch(searchFailureAction({ error: "검색에 실패했습니다." }));
  }
};
