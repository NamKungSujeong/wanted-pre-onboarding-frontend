import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SignIn = () => {
  const [message, setMessage] = useState("");
  const [pwmessage, setPwMessage] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  let navigate = useNavigate();

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

    fetch("https://pre-onboarding-selection-task.shop/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: `${email}`,
        password: `${pw}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    navigate("/signin");
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
