import React, { useState, useEffect } from "react";
import styles from "./filterbar.module.css";

const FilterBar = ({ items, onFilterChange }) => {
  //   console.log(items);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    const filterdList = items.filter((item) => {
      const categoryMatch = selectedCategory
        ? item.category === selectedCategory
        : true;
      const stockMatch = inStockOnly ? item.inStock === true : true;

      return categoryMatch && stockMatch;
    });
    // console.log("Updated filterlist: ", filterList);
    onFilterChange(filterdList);
  }, [items, selectedCategory, inStockOnly]);

  const onCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const onInStockChange = (e) => {
    setInStockOnly(e.target.checked);
  };

  return (
    <>
      <div className={styles.filterBarContainer}>
        <select
          name="categoryChoice"
          id="categoryChoice"
          className={styles.selectCategory}
          onChange={onCategoryChange}
        >
          <option value="">Categories</option>
          {/* {items.map((item) => (
            <option key={item.id} value={item.category}>
              {item.category}
            </option>
          ))} */}
          {[...new Set(items.map((item) => item.category))].map(
            (category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            )
          )}
        </select>
        <div className={styles.inStock}>
          <label htmlFor="isInStock">Show only if in stock</label>
          <input
            type="checkbox"
            name="isInStock"
            id="isInStock"
            onChange={onInStockChange}
          />
        </div>
      </div>
    </>
  );
};

export default FilterBar;
