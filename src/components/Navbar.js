import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '10px', verticalAlign: 'middle' }} />
          Mizc Beauty
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Ana Sayfa</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Ürünler 
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/Kozmetik">Kozmetik</Link></li>
                <li><Link className="dropdown-item" to="/SacBakim">Saç Bakım</Link></li>
                <li><Link className="dropdown-item" to="/Makyaj">Makyaj</Link></li>
                <li><Link className="dropdown-item" to="/ErkekBakim">Erkek Bakım</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Randevu">Randevu</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Hakkinda">Hakkında</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
