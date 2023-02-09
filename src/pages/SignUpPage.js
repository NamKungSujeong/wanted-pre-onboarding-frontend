import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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

  const emailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const validityPw = /^(?=.*[a-zA-Z0-9]).{7,}$/;

  const btnDisabled = () => {
    if (emailRegex.test(email) && validityPw.test(pw)) {
      setDisabled(false);
    }
  };
  const emailRef = useRef();

  const EmailValidation = (e) => {
    setEmail(e.target.value);

    if (!emailRegex.test(email)) {
      setMessage("이메일 형식이 올바르지 않습니다.");
    } else {
      setMessage("");
      btnDisabled();
    }
  };

  const PwValidation = (e) => {
    setPw(e.target.value);

    if (!validityPw.test(pw)) {
      setPwMessage("비밀번호 형식이 올바르지 않습니다.");
    } else {
      setPwMessage("");
      btnDisabled();
    }
  };

  const Sign = (e) => {
    e.preventDefault();
    if (emailRegex.test(email) && validityPw.test(pw)) {
      axios({
        method: "post",
        url: "https://pre-onboarding-selection-task.shop/auth/signup",
        Headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: `${email}`,
          password: `${pw}`,
        },
      })
        .then((res) => {
          console.log(res);
          navigate("/signin");
        })
        .catch((error) => {
          if (error.response.data.statusCode === 400) {
            alert(error.response.data.message);
          }
        });
    }
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
          onChange={EmailValidation}
          ref={emailRef}
        />
        <ErrorMessage>{message}</ErrorMessage>
        <input
          required
          type="password"
          data-testid="password-input"
          placeholder="비밀번호를 입력해주세요"
          value={pw}
          onChange={PwValidation}
        />
        <ErrorMessage>{pwmessage}</ErrorMessage>
        <button data-testid="signup-button" onClick={Sign} disabled={disabled}>
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
  margin: 150px auto 0;
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
