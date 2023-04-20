import {useState} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {useAuth} from './../hooks/useAuth';
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Navigation from "./Navigation";
import Home from "../pages/Home";
import Admin from "../pages/Admin";
import User from "../pages/User";
import Trips from "../pages/Trips";
import Schedule from "../pages/Schedule";
import Menu from "./../components/Menu";
import Footer from "./../components/Footer";

const AppRouter = () => {
    const [menuActive, setMenuActive] = useState('');
    const {isAuth} = useAuth();
    
    if (!isAuth) {
        return (
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
            );
    }

    return (
        <> 
            <Navigation active={menuActive} setActive={setMenuActive} />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/trips" element={<Trips />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/user" element={<User />} />
                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
            <Menu active={menuActive} setActive={setMenuActive} />
            <Footer />
        </>
    );
}
  
export default AppRouter;