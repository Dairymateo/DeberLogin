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
      const response = await fetch('http://localhost:3000/items', {
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
      await fetch('http://localhost:3000/items', {
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


  return (

  );
}

export default CRUDOperations;