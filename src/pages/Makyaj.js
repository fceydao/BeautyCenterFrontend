import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import m01 from '../images/m01.png';
import m02 from '../images/m02.png';
import m03 from '../images/m03.png';
import m04 from '../images/m04.png';
import m05 from '../images/m05.png';
import m06 from '../images/m06.png';
import m07 from '../images/m07.png';
import m08 from '../images/m08.png';
import '../styles/style.css';

const products = [
  { id: 19, name: 'Ekstra Siyah Maskara', price: 249.00, image: m01, category: 'Göz Makyajı' },
  { id: 20, name: 'Sable Brown Eyeliner', price: 107.00, image: m02, category: 'Göz Makyajı' },
  { id: 21, name: 'Far Paleti', price: 249.00, image: m03, category: 'Göz Makyajı' },
  { id: 22, name: 'Likit Parlak Ruj', price: 259.00, image: m04, category: 'Dudak Makyajı' },
  { id: 23, name: 'Lipstick', price: 149.00, image: m05, category: 'Dudak Makyajı' },
  { id: 24, name: 'Pink Ruj', price: 325.00, image: m06, category: 'Dudak Makyajı' },
  { id: 25, name: 'Allık', price: 229.00, image: m07, category: 'Yüz Makyajı' },
  { id: 26, name: 'Kapatıcı Fondöten', price: 299.00, image: m08, category: 'Yüz Makyajı' },
];

const Makyaj = () => {
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
  }, [selectedCategories, priceRange, filterProducts]);

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
      <h1 className="my-4">Makyaj</h1>
      <div className="row">
        <div className="col-md-3">
          <div className="mb-4 p-3 border mb-10">
            <h5 className="mb-3">Alt Kategoriler</h5>
            {['Göz Makyajı', 'Dudak Makyajı', 'Yüz Makyajı'].map(category => (
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

export default Makyaj;
