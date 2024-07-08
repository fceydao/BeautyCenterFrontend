import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import eb01 from '../images/eb01.png';
import eb02 from '../images/eb02.png';
import eb03 from '../images/eb03.png';
import eb04 from '../images/eb04.png';
import eb05 from '../images/eb05.png';
import eb06 from '../images/eb06.png';
import '../styles/style.css';

const products = [
  { id: 13, name: 'Tıraş Losyonu 100 ml', price: 180.00, image: eb01, category: 'Tıraş Losyonu' },
  { id: 14, name: 'Tıraş Losyonu 100 ml', price: 180.00, image: eb02, category: 'Tıraş Losyonu' },
  { id: 15, name: 'Tıraş Köpüğü 200 ml', price: 79.00, image: eb03, category: 'Tıraş Köpüğü' },
  { id: 16, name: '5\'li Tıraş Bıçağı', price: 84.00, image: eb04, category: 'Tıraş Bıçağı' },
  { id: 17, name: '3\'lü Tıraş Bıçağı', price: 93.00, image: eb05, category: 'Tıraş Bıçağı' },
  { id: 18, name: 'Tıraş Köpüğü 200 ml', price: 107.00, image: eb06, category: 'Tıraş Köpüğü' },
];

const ErkekBakim = () => {
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

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
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
      <h1 className="my-4">Erkek Bakım</h1>
      <div className="row">
        <div className="col-md-3">
          <div className="mb-4 p-3 border mb-10">
            <h5 className="mb-3">Alt Kategoriler</h5>
            {['Tıraş Bıçağı', 'Tıraş Köpüğü', 'Tıraş Losyonu'].map(category => (
              <div key={category} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={category}
                  id={category}
                  onChange={() => handleCategoryChange(category)}
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
                onChange={handlePriceChange}
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
                onChange={handlePriceChange}
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
                      <i className="bi bi-heart"></i> Favorilere Ekle
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

export default ErkekBakim;
