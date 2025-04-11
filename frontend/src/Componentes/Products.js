import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;