import React from "react";
import { Helmet } from "react-helmet";

const Meta = (props) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{props.title}</title>
      {/* SEO 태그 */}
      <meta name="description" content="props.description" />
      <meta name="keyword" content="props.keyword" />
      <meta name="author" content="props.author" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="props.title" />
      <meta property="og:description" content="props.description" />
      <meta property="og:image" content="props.image" />
      <meta property="og:url" content="props.url" />

      {/* 추가적으로 적용해야할 외부 js나 css로 여기서 명시할 수 있다.*/}
      <script src="//code.jquery.com/jquery.min.js"></script>
      <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "BoxOffice",
  description: "React.js로 구현한 영화순위 데시보드",
  keywords: "React,영화순위,박스오피스",
  author: "채니",
  image:
    window.location.protocol +
    "//" +
    window.location.hostname +
    ":" +
    window.location.port +
    "/logo512.png",
  url: window.location.href,
};

export default Meta;
