import MainPage from "./pages/MainPage";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUpPage";
import SignIn from "./pages/SignInPage";
import TodoPage from "./pages/TodoPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/todo" element={<TodoPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
