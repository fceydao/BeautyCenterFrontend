import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import k01 from '../images/k01.png';
import k02 from '../images/k02.png';
import k03 from '../images/k03.png';
import k04 from '../images/k04.png';
import k05 from '../images/k05.png';
import k06 from '../images/k06.png';
import '../styles/style.css';

const products = [
  { id: 7, name: 'Beyazlatıcı Diş Macunu 75 ml', price: 164.50, image: k01, category: 'Diş Macunu' },
  { id: 8, name: 'Aktif Kömür Diş Macunu 75 ml', price: 179.50, image: k02, category: 'Diş Macunu' },
  { id: 9, name: 'Peeling Katı Sabun 90 gr', price: 32.50, image: k03, category: 'Sabun' },
  { id: 10, name: 'Olive Oil Sabun 170 gr', price: 21.50, image: k04, category: 'Sabun' },
  { id: 11, name: 'Lavanta Bahçesi Duş Jeli 400 ml', price: 100, image: k05, category: 'Duş Jeli' },
  { id: 12, name: 'Çilek Duş Jeli 400 ml', price: 79, image: k06, category: 'Duş Jeli' },
];

const Kozmetik = () => {
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
      <h1 className="my-4">Kozmetik</h1>
      <div className="row">
        <div className="col-md-3">
          <div className="mb-4 p-3 border mb-10">
            <h5 className="mb-3">Alt Kategoriler</h5>
            {['Diş Macunu', 'Duş Jeli', 'Sabun'].map(category => (
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

export default Kozmetik;
