import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/Signup";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Header from "./components/Header";
import SignUp from "./pages/Signup";
const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route  path="/" element={<Home/>}/>
        <Route path="/signin" element={<SignIn/>} />
        <Route  path="/signup" element={<SignUp/>}/>
        <Route  path="/profile" element={<Profile/>}/>
        <Route  path="/about" element={<About/>}/>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
