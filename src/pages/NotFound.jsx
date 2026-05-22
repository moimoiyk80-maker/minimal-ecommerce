import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

function NotFound() {

  return (
   <PageWrapper>
    <div className="notfound-page">

      <h1>
        404
      </h1>

      <p>
        페이지를 찾을 수 없습니다.
      </p>

      <Link
        to="/"
        className="notfound-link"
      >
        홈으로 이동
      </Link>

    </div>
   </PageWrapper> 
  );
}

export default NotFound;