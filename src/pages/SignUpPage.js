import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [message, setMessage] = useState("");
  const [pwmessage, setPwMessage] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [disabled, setDisabled] = useState(true);

  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      window.location.replace("/todo");
    }
  }, []);

  const emailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const validityPw = /^(?=.*[a-zA-Z0-9]).{7,}$/;

  const btnDisabled = () => {
    if (emailRegex.test(email) && validityPw.test(pw)) {
      setDisabled(false);
    }
  };
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
    <SignupForm>
      <input
        required
        type="email"
        data-testid="email-input"
        placeholder="이메일을 입력해 주세요"
        value={email}
        onChange={EmailValidation}
      />
      <div>{message}</div>
      <input
        required
        type="password"
        data-testid="password-input"
        placeholder="비밀번호를 입력해주세요"
        value={pw}
        onChange={PwValidation}
      />
      <div>{pwmessage}</div>
      <button data-testid="signup-button" onClick={Sign} disabled={disabled}>
        회원가입
      </button>
      <Link to="/">홈</Link>
    </SignupForm>
  );
};

export default SignUp;

const SignupForm = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;

  input {
    height: 35px;
    margin: 10px 0;
  }
`;
