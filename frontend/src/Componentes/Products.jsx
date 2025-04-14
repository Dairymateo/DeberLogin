import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios
      .get('http://localhost:3000/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  };

  return (
    <div className='products-container'>
      <h2>Products</h2>
      <ul className='product-list'>
        {products.map((product) => (
          <li className='product-item' key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Precio: ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;