// src/components/Footer.js

import React from 'react';
import './Footer.css'; // Ensure you create this CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';
import logo from '../images/logo.png'; // Import your logo

const Footer = () => {
    return (
        <div className="content-wrapper">
            <div className="footer-content">
                <div className="footer-logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="footer-contact">
                    <br></br>
                    <p>34320 IU-CERRAHPASA</p>
                    <p>(0212) 404 03 00</p>
                    <p>https://bilgisayarmuhendislik.iuc.edu.tr</p>
                </div>
                <div className="footer-social">
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} size="2x" />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} size="2x" />
                    </a>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
