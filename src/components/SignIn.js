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

  const [message, setMessage] = useState("");
  const [pwmessage, setPwMessage] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  // 유효성 검사
  const emailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const validityPw = /^(?=.*[a-zA-Z0-9]).{7,}$/;

  const Validation = (e) => {
    setEmail(e.target.value);

    if (!emailRegex.test(email)) {
      setMessage("이메일 형식이 올바르지 않습니다.");
    } else {
      setMessage("");
    }
  };

  const Pwvalidation = (e) => {
    setPw(e.currentTarget.value);
    if (!validityPw.test(pw)) {
      setPwMessage("비밀번호 형식이 올바르지 않습니다.");
    } else {
      setPwMessage("");
    }
  };

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
        alert(error.response.data.message);
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
        onChange={Validation}
      />
      <div>{message}</div>
      <input
        required
        type="password"
        data-testid="password-input"
        placeholder="비밀번호를 입력해주세요"
        value={pw}
        onChange={Pwvalidation}
      />
      <div>{pwmessage}</div>
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

  input {
    height: 35px;
    margin: 10px 0;
  }
`;
