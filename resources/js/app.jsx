import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from './components/LandingPages';
import Register from './components/RegisterPages';
import Login from './components/LoginPages';
import VerifyEmail from './components/VerifyEmailPages';
import ForgotPassword from './components/ForgetPassPages';
import VerifyResetCode from './components/ForgetPassProcess/VerifyResetCode';
import ResetPassword from './components/ForgetPassProcess/ResetPassword';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/verify-reset-code" element={<VerifyResetCode />} />
                <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
        </BrowserRouter>
    );
}

const rootElement = document.getElementById('app');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
}
