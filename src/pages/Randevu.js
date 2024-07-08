import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import { FaStar, FaMapMarkerAlt, FaClock, FaEdit, FaTrash } from 'react-icons/fa';
import randevu1 from '../images/randevu1.jpeg';
import randevu2 from '../images/randevu2.jpeg';
import '../styles/randevu.css';

function Appointment() {
  const [date, setDate] = useState('');
  const [service, setService] = useState('');
  const [comment, setComment] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:5002/api/appointments/${userId}`);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setErrorMessage('Mevcut randevu bilgileri alınırken bir hata oluştu.');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    try {
      const response = await axios.post('http://localhost:5002/api/appointment', { userId, date, service });
      console.log('Appointment booked:', response.data);
      setSuccessMessage('Randevu başarıyla oluşturuldu!');
      // Yeni randevu ekledikten sonra mevcut randevuları güncelle
      fetchAppointments();
    } catch (error) {
      console.error('Error booking appointment:', error);
      setErrorMessage('Randevu oluşturulurken bir hata oluştu.');
    }
  };

  const handleCommentSubmit = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await axios.post('http://localhost:5002/api/addComment', { userId, comment });
      console.log('Comment added:', response.data);
      setComment('');
      setSuccessMessage('Yorum başarıyla gönderildi!');
    } catch (error) {
      console.error('Error adding comment:', error);
      setErrorMessage('Yorum gönderilirken bir hata oluştu.');
    }
  };

  const handleEdit = (appointmentId) => {
    // Düzenleme işlemleri burada gerçekleştirilecek
    console.log('Edit appointment with ID:', appointmentId);
  };

  const handleDelete = async (appointmentId) => {
    try {
      const response = await axios.delete(`http://localhost:5002/api/appointments/${appointmentId}`);
      console.log('Appointment deleted:', response.data);
      // Randevuyu sildikten sonra mevcut randevuları güncelle
      fetchAppointments();
    } catch (error) {
      console.error('Error deleting appointment:', error);
      setErrorMessage('Randevu silinirken bir hata oluştu.');
    }
  };


  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="d-flex align-items-center mb-3">
            <FaStar className="star-icon" />
            <FaStar className="star-icon" />
            <FaStar className="star-icon" />
            <FaStar className="star-icon" />
            <FaStar className="star-icon" />
            <span>248 görüntülenme</span>
          </div>
          <Row className="mb-3">
            <Col xs={6}>
              <img src={randevu1} alt="randevu1" className="img-fluid rounded" />
            </Col>
            <Col xs={6}>
              <img src={randevu2} alt="randevu2" className="img-fluid rounded" />
            </Col>
          </Row>
          <div className="d-flex mb-3">
            <FaMapMarkerAlt className="location-icon" />
            <span>Avcılar, İstanbul</span>
          </div>
          <div className="d-flex mb-3">
            <FaClock className="clock-icon" />
            <span>Hafta içi: 11:00-18:00</span>
          </div>
          <hr className="gradient-divider mb-4" />

          <h2 className="mb-4 text-center">Randevu Al</h2>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formDate" className="mb-3">
              <Form.Label>Tarih</Form.Label>
              <Form.Control 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                required 
              />
            </Form.Group>
            <Form.Group controlId="formService" className="mb-3">
              <Form.Label>Hizmet</Form.Label>
              <Form.Control 
                as="select"
                value={service} 
                onChange={(e) => setService(e.target.value)} 
                required
              >
                <option value="">Bir hizmet seçiniz</option>
                <option value="Saç">Saç</option>
                <option value="Makyaj">Makyaj</option>
                <option value="Tırnak">Tırnak</option>
                <option value="Bakım">Bakım</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Randevu Al
            </Button>
          </Form>

          <hr className="my-5" />

          <h2 className="mb-4 text-center">Mevcut Randevular</h2>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <Card key={appointment._id} className="mb-3">
                <Card.Body>
                  <Card.Title>{appointment.service}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{appointment.date}</Card.Subtitle>
                  <Button variant="primary" onClick={() => handleEdit(appointment._id)} className="me-2">
                    <FaEdit /> Düzenle
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(appointment._id)}>
                    <FaTrash /> Sil
                  </Button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p className="text-center">Mevcut randevu bulunmamaktadır.</p>
          )}

          <hr className="my-5" />

          <Form.Group controlId="formComment" className="mb-3">
            <Form.Label>Yorumunuz</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              value={comment} 
              onChange={(e) => setComment(e.target.value)} 
              required 
            />
          </Form.Group>
          <Button variant="primary" onClick={handleCommentSubmit}>
            Yorumu Gönder
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Appointment;

