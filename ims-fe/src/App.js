import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import ForgotPassword from './components/auth/ForgotPassword';
import Home from "./components/Home";
import SignUp from "./components/auth/SignUp";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <Navigate to="/signin"/>
                }/>
                <Route path="/signup" element={
                    <SignUp/>
                }/>
                <Route path="/signin" element={
                    <SignIn/>
                }/>
                <Route path="/forgotpassword" element={
                    <ForgotPassword/>
                }/>
                <Route path="/home" element={
                    <Home/>
                }/>
            </Routes>
        </Router>
    );
};

export default App;
