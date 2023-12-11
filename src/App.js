import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Forgot from "./pages/Forgot/Forgot";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";
import { ToastContainer } from "react-toastify";
import "./App.css";
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/home" element={<Home />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
