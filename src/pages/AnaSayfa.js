import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import nailart from '../images/nailart.mp4';
import salon1 from '../images/salon1.jpeg';
import haircut1 from '../images/haircut1.jpeg';
import hairdying1 from '../images/hairdying1.jpeg';
import hairstyling from '../images/hairstyling.jpg';
import headerImage from '../images/header.jpeg'; // Import the header image
import CommentCarousel from './CommentCarousel';
import '../styles/style.css';

const AnaSayfa = () => {
  const navigate = useNavigate();

  const handleAppointmentClick = () => {
    navigate('/Randevu');
  };

  const handleAboutClick = () => {
    navigate('/Hakkinda'); // Navigate to the Hakkinda.js page
  };

  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <video className="d-block w-100" autoPlay loop muted>
            <source src={nailart} type="video/mp4" />
          </video>
          <Carousel.Caption>
            <h3>Nail Art</h3>
            <Button variant="primary" onClick={handleAppointmentClick}>Randevu Al</Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={salon1} alt="Salon" />
          <Carousel.Caption>
            <Button variant="primary" onClick={handleAppointmentClick}>Randevu Al</Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={haircut1} alt="Haircut 1" />
          <Carousel.Caption>
            <h3>Saç Kesimi</h3>
            <Button variant="primary" onClick={handleAppointmentClick}>Randevu Al</Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={hairstyling} alt="Haircut 2" />
          <Carousel.Caption>
            <h3>Hair Styling</h3>
            <Button variant="primary" onClick={handleAppointmentClick}>Randevu Al</Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={hairdying1} alt="Hair Dying" />
          <Carousel.Caption>
            <h3>Saç Boyama</h3>
            <Button variant="primary" onClick={handleAppointmentClick}>Randevu Al</Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div style={{ marginTop: '20px' }}>
        <CommentCarousel />
      </div>

      <div className="header-section">
        <img src={headerImage} alt="Header" className="header-image" />
        <div className="header-content">
          <h1>Biz Kimiz?</h1>
          <Button variant="primary" onClick={handleAboutClick}>Hikayemiz</Button>
        </div>
      </div>
    </div>
  );
};

export default AnaSayfa;
