import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../utils/Api";

const SignUp = () => {
  const [message, setMessage] = useState("");
  const [pwmessage, setPwMessage] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      navigate("/todo");
    }
  });

  // 유효성 검사 정규식
  const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]/i;

  // 둘의 조건을 모두 만족해야 disabled가 풀리는 함수
  const btnDisabled = () => {
    if (emailRegex.test(email) && pw.length >= 7) {
      setDisabled(false);
      return;
    }
  };

  //이메일 유효성 검사
  const emailValidation = (e) => {
    setEmail(e.target.value);

    if (!emailRegex.test(email) || e.target.value.length === 0) {
      setMessage("이메일 형식이 올바르지 않습니다.");
      setDisabled(true);
    } else {
      setMessage("");
      btnDisabled();
    }
  };

  // 비밀번호 유효성 검사
  const pwValidation = (e) => {
    setPw(e.target.value);

    if (e.target.value.length < 8) {
      setPwMessage("비밀번호 형식이 올바르지 않습니다.");
      setDisabled(true);
    } else {
      setPwMessage("");
      btnDisabled();
    }
  };

  const signup = (e) => {
    e.preventDefault();
    Api.post(
      "/auth/signup",
      { email: email, password: pw },
      {
        Headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        console.log(res);
        navigate("/signin");
      })
      .catch((error) => {
        if (error.response.data.statusCode === 400) {
          alert(error.response.data.message);
        }
      });
  };

  return (
    <SignUpPage>
      <h1>SignIn</h1>
      <SignupForm>
        <input
          required
          type="email"
          data-testid="email-input"
          placeholder="이메일을 입력해 주세요"
          value={email}
          onChange={emailValidation}
        />
        <ErrorMessage>{message}</ErrorMessage>
        <input
          required
          type="password"
          data-testid="password-input"
          placeholder="비밀번호를 입력해주세요"
          value={pw}
          onChange={pwValidation}
        />
        <ErrorMessage>{pwmessage}</ErrorMessage>
        <button
          data-testid="signup-button"
          onClick={signup}
          disabled={disabled}
        >
          회원가입
        </button>
        <OtherLinks>
          <span>
            <Link to="/">홈</Link>으로 가기
          </span>
        </OtherLinks>
      </SignupForm>
    </SignUpPage>
  );
};

export default SignUp;

const SignUpPage = styled.main`
  width: 300px;
  margin: 100px auto 0;
  padding: 100px 25px;
  text-align: center;
  border: 1px solid black;
  border-radius: 5px;
`;

const SignupForm = styled.form`
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

const OtherLinks = styled.section`
  padding-top: 15px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8rem;
`;
