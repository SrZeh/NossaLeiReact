import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import NewUserScreen from './screens/NewUserScreen';
import NewLawScreen from './screens/NewLawScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import News from './screens/News';
import LawList from './screens/LawList';

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/new-user" element={<NewUserScreen />} />
        <Route path="/new-law" element={<NewLawScreen />} />
        <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
        <Route path="/news" element={<News />} />
        <Route path="/law-list" element={<LawList />} />
    </Routes>
);

export default AppRoutes;
