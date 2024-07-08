import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnaSayfa from './pages/AnaSayfa';
import Randevu from './pages/Randevu';
import Hakkinda from './pages/Hakkinda';
import Login from './pages/Login';
import Kozmetik from './pages/Kozmetik';
import SacBakim from './pages/SacBakim';
import Makyaj from './pages/Makyaj';
import ErkekBakim from './pages/ErkekBakim';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<AnaSayfa />} />
            <Route path="/Randevu" element={<Randevu />} />
            <Route path="/Hakkinda" element={<Hakkinda />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Kozmetik" element={<Kozmetik />} />
            <Route path="/SacBakim" element={<SacBakim />} />
            <Route path="/Makyaj" element={<Makyaj />} />
            <Route path="/ErkekBakim" element={<ErkekBakim />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
