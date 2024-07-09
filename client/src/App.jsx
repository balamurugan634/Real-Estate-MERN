import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/Signup";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Header from "./components/Header";
import SignUp from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";
import Createlist from "./pages/Createlist";
import Updatelist from "./pages/updatelist";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes >
        <Route  path="/" element={<Home/>}/>
        <Route path="/signin" element={<SignIn/>} />
        <Route  path="/signup" element={<SignUp/>}/>
        <Route path="/listing/:id" element={<Listing/>}></Route>
        <Route path="/search" element={<Search/>}/>
        <Route element={<PrivateRoute/>}>
          <Route  path="/profile" element={<Profile/>}/>
          <Route path="/createlist" element={<Createlist/>}></Route>
          <Route path="/updatelist/:id" element={<Updatelist/>}></Route>


        </Route>
        <Route  path="/about" element={<About/>}/>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
