import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import sb01 from '../images/sb01.png';
import sb02 from '../images/sb02.png';
import sb03 from '../images/sb03.png';
import sb04 from '../images/sb04.png';
import sb05 from '../images/sb05.png';
import sb06 from '../images/sb06.png';
import '../styles/style.css';

const products = [
  { id: 1, name: 'Biotin Keratin Şampuan 250 ml', price: 99, category: 'Şampuan', image: sb01 },
  { id: 2, name: 'Mor Sülfatsız Şampuan 250 ml', price: 200, category: 'Şampuan', image: sb02 },
  { id: 3, name: 'Besleyici ve Kırılma karşıtı saç bakım kremi 250 ml', price: 173, category: 'Saç Bakım Kremi', image: sb03 },
  { id: 4, name: 'Sülfatsız Saç Bakım Kremi 250 ml', price: 200, category: 'Saç Bakım Kremi', image: sb04 },
  { id: 5, name: 'Bukle Belirginleştirici Durulanmayan Saç Bakım Kremi 175 ml', price: 157, category: 'Saç Bakım Kremi', image: sb05 },
  { id: 6, name: 'Sabitleyici Saç Spreyi 250 ml', price: 203, category: 'Saç Spreyi', image: sb06 },
];

const SacBakim = () => {
  const [sortedProducts, setSortedProducts] = useState(products);
  const [favorites, setFavorites] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const filterProducts = useCallback(() => {
    const filtered = products.filter(product => {
      const inCategory = selectedCategories.length
        ? selectedCategories.includes(product.category)
        : true;
      const inPriceRange =
        (!priceRange.min || product.price >= priceRange.min) &&
        (!priceRange.max || product.price <= priceRange.max);
      return inCategory && inPriceRange;
    });
    setSortedProducts(filtered);
  }, [selectedCategories, priceRange]);

  useEffect(() => {
    filterProducts();
  }, [selectedCategories, filterProducts]);

  const toggleFavorite = async (productId) => {
    try {
      const response = await axios.post('http://localhost:5002/api/addFavorite', { userId: localStorage.getItem('userId'), productId });
      // Favoriye ekleme işlemi başarılı olduğunda ekrana bir uyarı mesajı gösterilebilir
      console.log(response.data.message);
      // Favoriye eklenen ürünün favoriler listesine eklenmesi
      setFavorites([...favorites, productId]);
    } catch (error) {
      console.error('Error adding to favorites:', error);
      // Favoriye ekleme işlemi başarısız olduğunda bir hata mesajı gösterilebilir
      alert('Failed to add to favorites');
    }
  };

  const isFavorite = (productId) => favorites.includes(productId);

  const sortProducts = (order) => {
    const sorted = [...sortedProducts].sort((a, b) => {
      if (order === 'asc') return a.price - b.price;
      return b.price - a.price;
    });
    setSortedProducts(sorted);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prevCategories =>
      prevCategories.includes(category)
        ? prevCategories.filter(cat => cat !== category)
        : [...prevCategories, category]
    );
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prevRange => ({
      ...prevRange,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <h1 className="my-4">Saç Bakım</h1>
      <div className="row">
        <div className="col-md-3">
          <div className="mb-4 p-3 border mb-10">
            <h5 className="mb-3">Alt Kategoriler</h5>
            {['Şampuan', 'Saç Bakım Kremi', 'Saç Spreyi'].map(category => (
              <div key={category} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={category}
                  id={category}
                  onChange={() => setSelectedCategories(prevCategories =>
                    prevCategories.includes(category)
                      ? prevCategories.filter(cat => cat !== category)
                      : [...prevCategories, category]
                  )}
                  checked={selectedCategories.includes(category)}
                />
                <label className="form-check-label" htmlFor={category}>
                  {category}
                </label>
              </div>
            ))}
          </div>
          <div className="mb-4 p-3 border">
            <h5 className="mb-3">Fiyat Aralığı (TL)</h5>
            <div className="mb-2 input-group">
              <input
                type="number"
                className="form-control"
                placeholder="Min"
                name="min"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prevRange => ({ ...prevRange, min: e.target.value }))}
              />
              <div className="input-group-append">
                <span className="input-group-text">TL</span>
              </div>
            </div>
            <div className="mb-2 input-group">
              <input
                type="number"
                className="form-control"
                placeholder="Max"
                name="max"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prevRange => ({ ...prevRange, max: e.target.value }))}
              />
              <div className="input-group-append">
                <span className="input-group-text">TL</span>
              </div>
            </div>
            <button className="btn btn-primary" onClick={filterProducts}>
              Filtrele
            </button>
          </div>
        </div>
        <div className="col-md-9">
        <div className="d-flex justify-content-between mb-3">
            <p>{`${sortedProducts.length} ürün listeleniyor`}</p>
            <div>
              <button 
                className="btn btn-primary me-2" 
                onClick={() => sortProducts('asc')}
              >
                Fiyat Artan
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => sortProducts('desc')}
              >
                Fiyat Azalan
              </button>
            </div>
          </div>
          <div className="row">
            {sortedProducts.map(product => (
              <div key={product.id} className="col-md-6 mb-4">
                <div className="card h-100">
                  <img src={product.image} className="img-fluid card-img-top product-image" alt={product.name} />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.price} TL</p>
                    <button
                      className={`btn btn-${isFavorite(product.id) ? 'danger' : 'outline-danger'}`}
                      onClick={() => toggleFavorite(product.id)}
                    >
                      {isFavorite(product.id) ? 'Favoriden Kaldır' : 'Favorilere Ekle'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SacBakim;
