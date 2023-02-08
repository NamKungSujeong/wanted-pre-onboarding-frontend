import styled from "styled-components";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <MainPageBlock>
      <Intro>Todo-List</Intro>
      <EnterButtons>
        <Link to="signup">
          <button>회원가입</button>
        </Link>
        <Link to="signin">
          <button>로그인</button>
        </Link>
      </EnterButtons>
    </MainPageBlock>
  );
};

export default MainPage;

const MainPageBlock = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Intro = styled.section`
  padding-top: 200px;
  font-size: 3rem;
`;

const EnterButtons = styled.section`
  padding-top: 50px;

  button {
    padding: 5px 10px;
    margin: 10px;
    font-size: 1.2rem;
    background-color: #fff;
    border: 2px solid black;
    border-radius: 5px;

    &:hover {
      cursor: pointer;
      background-color: #e9e9e9;
    }
  }
`;
