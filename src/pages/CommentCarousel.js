// CommentCarousel.js

import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';
import '../styles/CommentCarousel.css'; // Stil dosyasını doğru şekilde import ediyoruz

const CommentCarousel = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Yorumları çekme işlemi
    async function fetchComments() {
      try {
        const response = await axios.get('http://localhost:5002/api/comments');
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }
    fetchComments();
  }, []); // Boş dependency array, sadece bir kere çağrılmasını sağlar

  return (
    <Carousel className="comment-carousel" indicators={true} prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon" />} nextIcon={<span aria-hidden="true" className="carousel-control-next-icon" />}>
      {comments.map((comment, index) => (
        <Carousel.Item key={index} className="carousel-item-custom">
          <div className="comment">
            <p>{comment.comment}</p>
            <h6>{comment.username}</h6> {/* Güncellendi: userId yerine username kullanılıyor */}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CommentCarousel;
