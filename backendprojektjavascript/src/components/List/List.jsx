import React, { useEffect, useState } from 'react';
import Item from '../Item/Item';

import styles from './list.module.css';
import useItems from '@/app/hooks/useItems';
import ItemForm from '../ItemForm/ItemForm';

const List = () => {
  const { items, fetchItems } = useItems();

  let desckey = 0;

  return (
    <>
      <ItemForm onItemChange={fetchItems} /> {/* Pass the function here */}
      <ul>
        {/* <Item
          key={desckey}
          name={'Name'}
          description={'Description'}
          quantity={'Quantity'}
        /> */}

        {items.map((item) => (
          // <li key={item.id}>{item.name}</li>
          <Item key={item.id} onItemChange={fetchItems} {...item} />
        ))}
      </ul>
    </>
  );
};

export default List;
