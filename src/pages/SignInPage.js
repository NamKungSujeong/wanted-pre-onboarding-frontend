import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const SignIn = () => {
  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      window.location.replace("/todo");
    }
  }, []);

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  // 유효성 검사

  const login = (e) => {
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
        window.location.replace("/todo");
      })
      .catch((error) => {
        if (error.response.data.statusCode === 401) {
          alert("아이디 또는 비밀번호를 확인해주세요");
        }
      });
  };

  return (
    <SigninForm>
      <input
        required
        type="email"
        data-testid="email-input"
        placeholder="이메일을 입력해 주세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        required
        type="password"
        data-testid="password-input"
        placeholder="비밀번호를 입력해주세요"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
      />
      <button data-testid="signin-button" onClick={login}>
        로그인
      </button>
      <Link to="/">홈</Link>
    </SigninForm>
  );
};

export default SignIn;

const SigninForm = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
  margin: auto;
  padding-top: 200px;

  input {
    height: 35px;
    margin: 10px 0;
  }
`;
