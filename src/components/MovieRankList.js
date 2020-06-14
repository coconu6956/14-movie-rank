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
      </tabel>
    </div>
  );
};

export default MovieRankList;
