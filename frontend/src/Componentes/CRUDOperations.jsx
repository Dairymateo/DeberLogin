import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

function CRUDOperations() {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editItem, setEditItem] = useState({ id: null, value: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const createItem = async () => {
    try {
      await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ value: newItem }),
      });
      fetchData();
      setNewItem('');
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  const updateItem = async () => {
    try {
      await fetch(`http://localhost:3000/products/${editItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ value: editItem.value }),
      });
      fetchData();
      setEditItem({ id: null, value: '' });
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      <h2>CRUD Operations</h2>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={createItem}>Create</button>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.value}
            <button onClick={() => setEditItem({ id: item.id, value: item.value })}>Edit</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {editItem.id && (
        <div>
          <input
            type="text"
            value={editItem.value}
            onChange={(e) => setEditItem({ ...editItem, value: e.target.value })}
          />
          <button onClick={updateItem}>Update</button>
        </div>
      )}
    </div>
  );
}

export default CRUDOperations;