import React, { useState } from 'react';
import styles from './item.module.css';
import { useAuth } from '@/contexts/auth';
import Modal from '../Modal/Modal';

const Item = ({
  name,
  description,
  quantity,
  id,
  inStock,
  category,
  onItemChange,
}) => {
  const auth = useAuth();
  const [edit, setEdit] = useState(false);

  let itemToChange = {
    name,
    description,
    quantity,
    id,
    inStock,
    category,
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const id = e.target.id;

    try {
      const res = await fetch(`/api/items/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (!res.ok) {
        throw new Error('Failed to register');
      }
      if (onItemChange) {
        onItemChange();
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const id = e.target.id;
    setEdit(true);
  };

  return (
    <>
      {!edit ? (
        <div className={styles.listItems}>
          <div className={styles.top}>
            <div className={styles.listItem}>Name: {name}</div>
            <div className={styles.listItem}>
              {inStock ? 'In stock' : 'Out of stock'}
            </div>
            <div className={styles.listItem}>Category: {category}</div>
            <div className={styles.listItem}>Quantity: {quantity}</div>
          </div>
          <div className={styles.bot}>
            <div className={`${styles.listItem} ${styles.desc}`}>
              {description}
            </div>
            <div className={styles.listItem}>
              <button
                onClick={handleDelete}
                id={id}
                className={styles.deleteBtn}
              >
                Delete
              </button>
              <button className={styles.editBtn} onClick={handleEdit} id={id}>
                Edit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Modal
          setEdit={setEdit}
          item={itemToChange}
          onItemChange={onItemChange}
        />
      )}
    </>
  );
};

export default Item;
