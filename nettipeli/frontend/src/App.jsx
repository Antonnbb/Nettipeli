import { useState } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from '/pages/home.jsx'
import TrackingTest from '/pages/trackingtest.jsx'
import Leaderboard from '/pages/leaderboard.jsx'
import Login from '/pages/login.jsx'
import ReactionTest from '/pages/reactiontest.jsx'
import Register from '/pages/register.jsx'
import AimTraining from '/pages/aimtraining.jsx'
import Settings from '/pages/settings.jsx'
import Profile from '/pages/profile.jsx'

function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" />;
}



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home />} />
        <Route path="/tracking" element={<ProtectedRoute><TrackingTest /></ProtectedRoute>} />
        <Route path="/reaction" element={<ProtectedRoute><ReactionTest /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
        <Route path="/aim" element={<ProtectedRoute><AimTraining /></ProtectedRoute>} />
        <Route path="/leaderboard/reaction" element={<Leaderboard game="reaction" />} />
        <Route path="/leaderboard/tracking" element={<Leaderboard game="tracking" />} />
        <Route path="/leaderboard/aim" element={<Leaderboard game="aim" />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
