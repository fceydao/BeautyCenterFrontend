import React from 'react';
import '../styles/Hakkinda.css'; // CSS dosyasını import edin
import womanImage from '../images/woman.jpeg'; // Görseli import edin

const Hakkinda = () => {
  return (
    <div className="hakkinda-container">
      <h1 className="hakkinda-title">Huzurlu salonumuzda rahatlayın ve yenilenin.</h1>
      <div className="hakkinda-content">
        <div className="image-block">
          <img src={womanImage} alt="Woman" className="hakkinda-image"/>
          <div className="partner-block">
            <p className="partner-text">
            Size en üst düzey güzellik hizmetini sunabilmek adına Note, Urban ve Nivea gibi öncü markalarla iş birliği yapıyoruz. Bu markaların sunduğu ürünlerle, her ziyaretinizde eşsiz bir güzellik keyfi yaşamanızı sağlıyoruz.
            </p>
            <p className="partner-author">— Mizc Beauty</p>
          </div>
        </div>
        <p className="hakkinda-text">
        Tek çatı altında sunduğumuz geniş hizmet yelpazesi ile kendinizi şımartın. Manikür, saç kesimi ve şekillendirme, profesyonel makyaj, cilt bakımı gibi çeşitli hizmetlerimizle her ziyarette harika hissedeceksiniz. Uzman teknisyenlerimiz Melike, Gökçe, Ceyda ve İlayda, sizlere en iyi güzellik deneyimini yaşatmak için burada.
        </p>
      </div>
    </div>
  );
}

export default Hakkinda;

