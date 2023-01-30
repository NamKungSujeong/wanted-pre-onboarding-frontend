import "./App.css";
import MainPage from "./pages/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
// import Signin from "./components/Signin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          {/* <Route path="/signin" element={<Signin />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
