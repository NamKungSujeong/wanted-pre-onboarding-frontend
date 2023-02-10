# CRUD Todo-list Frontend

>원티드 프리온보딩 프론트엔드 인턴십 지원을 위해 제공받은 API를 사용해 Todo-List의 Frontend 개발을 진행하였습니다. \
>본 프로젝트는 React.js를 사용해 구현되었으면 크롬 기준으로 개발되었습니다.

#### 배포 주소
> <https://namkungsujeong.github.io/wanted-pre-onboarding-frontend/> \
> 위 링크로 들어가면 github.io에 배포된 사이트로 연결됩니다.

## 로컬 실행 방법

```
$ git clone https://github.com/NamKungSujeong/wanted-pre-onboarding-frontend.git
$ npm install
$ npm start
``` 

위 순서대로 실행하면 http://localhost:3000/wanted-pre-onboarding-frontend 가 실행됩니다.

## Stacks 📚

##### Environment
<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat-square&logo=Visual Studio Code&logoColor=white"/><img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white"/><img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/>


##### Development
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/><img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/><img src="https://img.shields.io/badge/styled components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>

## 기능 설명

1. 회원가입 / 로그인

  + email, password 유효성 검사 후 회원가입
  + 로그인 성공 시 로컬 스토리지에 응답 받은 토큰을 저장
  + 로컬 스토리지에 저장된 토큰이 있으면 별도의 로그인, 회원가입 절차 없이 TodoPage로 리다이렉트
 
2. 로그아웃

  + 저장되어 있는 토큰을 삭제함으로서 로그아웃 하는 기능

3. Todo 만들기

  + 사용자가 입력한 값을 TodoList에 추가하는 기능

4. Todo 가져오기

  + 로그인 후 TodoPage로 이동 시 저장되어 있던 TodoList를 출력하는 기능

5. Todo 수정

  + 사용자로부터 수정된 값을 받아 TodoList의 Todo를 수정하는 기능
  + 체크박스 체크 유무를 통해 완료 여부를 수정하는 기능

6. Todo 삭제

  + 삭제하고자 하는 TodoList를 삭제하는 기능


