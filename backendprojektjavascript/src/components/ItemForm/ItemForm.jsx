'use client';

import React, { useState } from 'react';
import style from './itemForm.module.css';
import { useAuth } from '@/contexts/auth';

const ItemForm = ({ onItemChange }) => {
  const [newItem, setNewItem] = useState({});

  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const item = {
      name: formData.get('itemName'),
      quantity: formData.get('quantity'),
      description: formData.get('description'),
      category: formData.get('category'),
    };
    setNewItem(item);
    console.log(item);

    // CALL FETCH FOR api/items
    try {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(item),
      });
      if (!res.ok) {
        throw new Error('Failed to register');
      }
      if (onItemChange) {
        onItemChange(); // Call the function to refetch items
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className={style.formH2}>Add an item!</h2>
      <div className={style.formContainer}>
        <div className={style.smallInput}>
          <input
            className={style.inputField}
            type='text'
            name='itemName'
            id='itemName'
            placeholder='name of item'
          />
          <input
            className={style.inputField}
            type='number'
            name='quantity'
            id='quantity'
            placeholder='Quantity'
          />
          <input
            className={style.inputField}
            type='text'
            name='category'
            id='category'
            placeholder='Category'
          />
          <button className={`${style.btn} ${style.primary}`}>
            Create new Item
          </button>
        </div>
        <textarea
          className={style.inputField}
          type='tex'
          name='description'
          id='description'
          placeholder='Description'
        />
      </div>
    </form>
  );
};

export default ItemForm;
