import React from "react";

const MovieRankList = ({ boxOfficeList }) => {
  return (
    <div className="table-responsive">
      <tabel className="table table-striped tabel-hover">
        <thead>
          <tr className="text-center">
            <th>순위</th>
            <th>제목</th>
            <th>관람객 수</th>
            <th>매출액</th>
            <th>누적 관람객 수</th>
            <th>누적 매출액</th>
          </tr>
        </thead>
        <tbody>
          {boxOfficeList &&
            boxOfficeList.map((item, index) => (
              <tr>
                <td className="text-center">{item.rank}</td>
                <td className="text-center">{item.movieNm}</td>
                <td className="text-center">
                  {Number(item.audiCnt).toLocaleString()}명
                </td>
                <td className="text-center">
                  {Number(item.salesAmt).toLocaleString()}원
                </td>
                <td className="text-center">
                  {Number(item.audiAcc).toLocaleString()}명
                </td>
                <td className="text-center">
                  {Number(item.salesAcc).toLocaleString()}원
                </td>
              </tr>
            ))}
        </tbody>
      </tabel>
    </div>
  );
};

export default MovieRankList;
