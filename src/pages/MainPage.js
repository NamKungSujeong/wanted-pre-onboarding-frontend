import styled from "styled-components";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <MainPageBlock>
      <Link to="signup">
        <button>회원가입</button>
      </Link>
    </MainPageBlock>
  );
};

export default MainPage;

const MainPageBlock = styled.main``;
