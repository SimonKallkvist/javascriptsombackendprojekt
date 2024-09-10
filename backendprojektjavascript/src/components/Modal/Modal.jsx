import React, { useState } from 'react';
import style from '../Item/item.module.css';
import { useAuth } from '@/contexts/auth';

const Modal = ({ setEdit, item, onItemChange }) => {
  const auth = useAuth();

  // Step 1: Set initial state for each input field using item prop
  const [newName, setNewName] = useState(item.name);
  const [category, setCategory] = useState(item.category);
  const [quantity, setQuantity] = useState(item.quantity);
  const [description, setDescription] = useState(item.description);

  const handleCancel = () => {
    setEdit(false);
  };
  const handleSave = async (e) => {
    console.log('Trying to save some new stuffs');
    // TRY AND CATCH FROM THE API/ITEM/ID
    e.preventDefault();
    const id = e.target.id;

    // Create an updated object with the current state values
    const updatedItem = {
      name: newName,
      category: category,
      quantity: Number(quantity), // Convert to number if necessary
      description: description,
    };

    try {
      const res = await fetch(`/api/items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(updatedItem),
      });

      if (!res.ok) {
        throw new Error('Failed to update item');
      }
      if (onItemChange) {
        onItemChange();
      }
    } catch (error) {
      console.log('Error: ', error);
    }
    setEdit(false);
  };
  return (
    <>
      <div className={style.listItems}>
        <div className={style.top}>
          <input
            type='text'
            defaultValue={item.name}
            className={style.listItem}
            onChange={(e) => setNewName(e.target.value)}
          />

          <input
            type='text'
            defaultValue={item.category}
            className={style.listItem}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type='number'
            defaultValue={item.quantity}
            className={style.listItem}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        {/* Wrapping btns and description */}
        <div className={style.bot}>
          <textarea
            className={`${style.desc} ${style.listItem}`}
            name='description'
            id='desc'
            defaultValue={item.description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div className={style.listItem}>
            <button className={style.deleteBtn} onClick={handleCancel}>
              Cancel
            </button>
            <button className={style.editBtn} onClick={handleSave} id={item.id}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
