import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const SignIn = () => {
  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      window.location.replace("/wanted-pre-onboarding-frontend/todo");
    }
  });

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const signin = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: "https://pre-onboarding-selection-task.shop/auth/signin",
      Headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: email,
        password: pw,
      },
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem("access_token", res.data.access_token);
        console.log("로그인 성공");
        window.location.replace("/wanted-pre-onboarding-frontend/todo");
      })
      .catch(() => {
        alert("아이디 또는 비밀번호를 확인해주세요");
      });
  };

  return (
    <SignInPage>
      <h1>Login</h1>
      <SigninForm>
        <input
          required
          type="email"
          data-testid="email-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          data-testid="password-input"
          placeholder="Password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <button data-testid="signin-button" onClick={signin}>
          로그인
        </button>
        <OtherLinks>
          <span>
            <Link to="/">홈</Link>으로 가기
          </span>
          /
          <span>
            <Link to="/signup">회원가입</Link>하러 가기
          </span>
        </OtherLinks>
      </SigninForm>
    </SignInPage>
  );
};

export default SignIn;

const SignInPage = styled.main`
  width: 300px;
  margin: 150px auto 0;
  padding: 100px 25px;
  text-align: center;
  border: 1px solid black;
  border-radius: 5px;
`;

const SigninForm = styled.form`
  display: flex;
  flex-direction: column;

  input {
    height: 35px;
    margin: 15px 0;
    padding-left: 5px;
  }

  button {
    margin-top: 15px;
    padding: 10px 0;
    background-color: #fff;
    border: 1px solid black;
    border-radius: 5px;
    font-weight: 500;

    &:hover {
      cursor: pointer;
      background-color: #e9e9e9;
    }
  }
`;

const OtherLinks = styled.div`
  padding-top: 15px;
  span {
    padding: 0 10px;
  }
`;
