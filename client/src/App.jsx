import axios from "axios";
import RegisterPage from "./components/Login/Register";
import { UserContextProvider } from "../UserContext";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/Login/Login";
import Profile from "./components/Pages/Profile/Profile";
import Home from "./components/Pages/Home/Home";
import DisplayPage from "./components/Pages/Display/DisplayPage";
import GenDisplay from "./components/Pages/Display/GenDisplay";
import SingleDoc from "./components/Pages/Display/SingleDoc";


axios.defaults.baseURL = 'https://reposite.onrender.com';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element = {<LoginPage/>}/>
        <Route path="/register" element = {<RegisterPage/>}/>
        <Route path="/profile" element = {<Profile/>}/>
        <Route path="/profile/:id" element = {<Profile/>}/>
        <Route path="/home/:id" element = {<Home/>}/>
        <Route path="/home/new" element = {<Home/>}/>
        <Route path="/home" element = {<DisplayPage/>}/> 
        <Route path="/files" element = {<GenDisplay/>}/> 
        <Route path="/files/:id" element = {<SingleDoc/>}/> 
      </Routes>
    </UserContextProvider>
  )
}

export default App
