import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import NewUserScreen from "./screens/NewUserScreen";
import NewLawScreen from "./screens/NewLawScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/new-user" element={<NewUserScreen />} />
        <Route path="/new-law" element={<NewLawScreen />} />
        <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
      </Routes>
    </Router>
  );
}
