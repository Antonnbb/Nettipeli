import { useState } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from '/pages/home.jsx'
import TrackingTest from '/pages/trackingtest.jsx'
import Leaderboard from '/pages/leaderboard.jsx'
import Login from '/pages/login.jsx'
import ReactionTest from '/pages/reactiontest.jsx'
import Register from '/pages/register.jsx'

function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" />;
}



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/tracking" element={<ProtectedRoute><TrackingTest /></ProtectedRoute>} />
        <Route path="/reaction" element={<ProtectedRoute><ReactionTest /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
} 

export default App
