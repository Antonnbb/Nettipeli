import { useState } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '/pages/home.jsx'
import TrackingTest from '/pages/trackingtest.jsx'
import Leaderboard from '/pages/leaderboard.jsx'
import Login from '/pages/login.jsx'
import ReactionTest from '/pages/reactiontest.jsx'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/tracking" element={<TrackingTest />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/reaction" element={<ReactionTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
