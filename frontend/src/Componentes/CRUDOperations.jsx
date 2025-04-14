import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import './CRUDOperations.css';

function CRUDOperations() {
    const { token } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [newProductName, setNewProductName] = useState('');
    const [newProductDescription, setNewProductDescription] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [newProductQuantity, setNewProductQuantity] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);
    const [updatedProductName, setUpdatedProductName] = useState('');
    const [updatedProductDescription, setUpdatedProductDescription] = useState('');
    const [updatedProductPrice, setUpdatedProductPrice] = useState('');
    const [updatedProductQuantity, setUpdatedProductQuantity] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const createProduct = async () => {
    try {
      await axios.post(
        'http://localhost:3000/products',
        {
          name: newProductName,
          description: newProductDescription,
          price: parseFloat(newProductPrice),
          quantity: parseInt(newProductQuantity, 10),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchProducts();
      setNewProductName('');
      setNewProductDescription('');
      setNewProductPrice('');
      setNewProductQuantity('');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleEdit = (product) => {
    console.log('HANDLE EDIT - Product ID:', product._id);
    setEditingProduct(product);
    setUpdatedProductName(product.name);
    setUpdatedProductDescription(product.description);
    setUpdatedProductPrice(product.price);
    setUpdatedProductQuantity(product.quantity);
  };

  const updateProduct = async () => {
    console.log('UPDATE PRODUCT - Editing Product State:', editingProduct);
    if (!editingProduct?._id) {
      console.error('UPDATE PRODUCT - Product ID is undefined.');
      return;
    }
    try {
      await axios.patch(
        `http://localhost:3000/products/${editingProduct._id}`,
        {
          name: updatedProductName,
          description: updatedProductDescription,
          price: parseFloat(updatedProductPrice),
          quantity: parseInt(updatedProductQuantity, 10),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchProducts();
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const deleteProduct = async (_id) => {
    console.log('DELETE PRODUCT - Product ID to delete:', _id);
    try {
      await axios.delete(`http://localhost:3000/products/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className='Conteiner-principal'>
      <h2>Products</h2>

      
      <h3>Create New Product</h3>
      <input
        type="text"
        placeholder="Name"
        value={newProductName}
        onChange={(e) => setNewProductName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={newProductDescription}
        onChange={(e) => setNewProductDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={newProductPrice}
        onChange={(e) => setNewProductPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={newProductQuantity}
        onChange={(e) => setNewProductQuantity(e.target.value)}
      />
      <button  onClick={createProduct}>Create Product</button>

    
      <div className='products-container'>
        <h3>Product List</h3>
        <div className='BottonsList'>
            <ul>
                {products.map((product) => (
                <li key={product._id}>
                    {product.name} - ${product.price} (Quantity: {product.quantity})
                    <button className='Edit' onClick={() => handleEdit(product)}>Edit</button>
                    <button className='Delete' onClick={() => deleteProduct(product._id)}>Delete</button>
                </li>
                ))}
            </ul>
        </div>
      </div>

      
      {editingProduct && (
        <div>
          <h3>Edit Product</h3>
          <input
            type="text"
            value={updatedProductName}
            onChange={(e) => setUpdatedProductName(e.target.value)}
          />
          <input
            type="text"
            value={updatedProductDescription}
            onChange={(e) => setUpdatedProductDescription(e.target.value)}
          />
          <input
            type="number"
            value={updatedProductPrice}
            onChange={(e) => setUpdatedProductPrice(e.target.value)}
          />
          <input
            type="number"
            value={updatedProductQuantity}
            onChange={(e) => setUpdatedProductQuantity(e.target.value)}
          />
          <button onClick={updateProduct}>Save Changes</button>
          <button onClick={() => setEditingProduct(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default CRUDOperations;