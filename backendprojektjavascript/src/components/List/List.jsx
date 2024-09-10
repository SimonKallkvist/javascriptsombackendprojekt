import React, { useState } from "react";
import Item from "../Item/Item";

import useItems from "@/app/hooks/useItems";
import ItemForm from "../ItemForm/ItemForm";
import FilterBar from "../FilterBar/FilterBar";

const List = () => {
  const { items, fetchItems } = useItems();

  const [filterdItems, setFilterdItems] = useState([]);

  const handleFilterChange = (filterList) => {
    setFilterdItems(filterList);
    // console.log("Filterd Items from FilterBar: ", filterList);
  };

  return (
    <>
      <ItemForm onItemChange={fetchItems} /> {/* Pass the function here */}
      <FilterBar items={items} onFilterChange={handleFilterChange} />
      <ul>
        {filterdItems.length > 0
          ? filterdItems.map((item) => (
              <Item key={item.id} onItemChange={fetchItems} {...item} />
            ))
          : items.map((item) => (
              <Item key={item.id} onItemChange={fetchItems} {...item} />
            ))}
      </ul>
    </>
  );
};

export default List;
