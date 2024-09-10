// // -_-
// import React, { useState } from "react";
// import style from "../Item/item.module.css";
// import { useAuth } from "@/contexts/auth";

// const Modal = ({ setEdit, item, onItemChange }) => {
//   const auth = useAuth();

//   // Step 1: Set initial state for each input field using item prop
//   const [newName, setNewName] = useState(item.name);
//   const [category, setCategory] = useState(item.category);
//   const [quantity, setQuantity] = useState(item.quantity);
//   const [description, setDescription] = useState(item.description);

//   const handleCancel = (e) => {
//     e.preventDefault();
//     setEdit(false);
//   };
//   const handleSave = async (e) => {
//     // console.log("Trying to save some new stuffs");
//     // TRY AND CATCH FROM THE API/ITEM/ID
//     e.preventDefault();
//     const id = e.target.id;

//     // Create an updated object with the current state values
//     const updatedItem = {
//       name: newName,
//       category: category,
//       quantity: Number(quantity), // Convert to number if necessary
//       description: description,
//     };

//     try {
//       const res = await fetch(`/api/items/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${auth.token}`,
//         },
//         body: JSON.stringify(updatedItem),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to update item");
//       }
//       if (onItemChange) {
//         onItemChange();
//       }
//     } catch (error) {
//       console.log("Error: ", error);
//     }
//     setEdit(false);
//   };

//   // -_-
//   return (
//     <>
//       <form onSubmit={handleSave}>
//         <div className={style.listItems}>
//           <div className={style.top}>
//             <input
//               required
//               type="text"
//               defaultValue={item.name}
//               className={style.listItem}
//               onChange={(e) => setNewName(e.target.value)}
//             />
//             <input
//               required
//               type="text"
//               defaultValue={item.category}
//               className={style.listItem}
//               onChange={(e) => setCategory(e.target.value)}
//             />
//             <input
//               required
//               type="number"
//               defaultValue={item.quantity}
//               className={style.listItem}
//               onChange={(e) => setQuantity(e.target.value)}
//             />
//           </div>
//           {/* Wrapping btns and description */}
//           <div className={style.bot}>
//             <textarea
//               required
//               className={`${style.desc} ${style.listItem}`}
//               name="description"
//               id="desc"
//               defaultValue={item.description}
//               onChange={(e) => setDescription(e.target.value)}
//             ></textarea>
//             <div className={style.listItem}>
//               <button className={style.deleteBtn} onClick={handleCancel}>
//                 Cancel
//               </button>
//               <button
//                 className={style.editBtn}
//                 onClick={handleSave}
//                 id={item.id}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };

// export default Modal;

import React, { useState } from "react";
import style from "../Item/item.module.css";
import { useAuth } from "@/contexts/auth";

const Modal = ({ setEdit, item, onItemChange }) => {
  const auth = useAuth();

  // State for each input field
  const [newName, setNewName] = useState(item.name);
  const [category, setCategory] = useState(item.category);
  const [quantity, setQuantity] = useState(item.quantity);
  const [description, setDescription] = useState(item.description);

  // State for input validation
  const [errors, setErrors] = useState({
    name: false,
    category: false,
    quantity: false,
    description: false,
  });

  const handleCancel = (e) => {
    e.preventDefault();
    setEdit(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {
      name: !newName.trim(),
      category: !category.trim(),
      quantity: !quantity,
      description: !description.trim(),
    };

    setErrors(newErrors);
    console.log(errors);

    // Check if there are any errors
    if (Object.values(newErrors).some((hasError) => hasError)) {
      return; // Don't proceed if there are validation errors
    }

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
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(updatedItem),
      });

      if (!res.ok) {
        throw new Error("Failed to update item");
      }
      if (onItemChange) {
        onItemChange();
      }
    } catch (error) {
      console.log("Error: ", error);
    }
    setEdit(false);
  };

  return (
    <>
      <form onSubmit={handleSave}>
        <div className={style.listItems}>
          <div className={style.top}>
            <input
              required
              type="text"
              defaultValue={item.name}
              className={`${style.listItem} ${
                errors.name ? style.errorBorder : ""
              }`}
              onChange={(e) => setNewName(e.target.value)}
            />
            <input
              required
              type="text"
              defaultValue={item.category}
              className={`${style.listItem} ${
                errors.category ? style.errorBorder : ""
              }`}
              onChange={(e) => setCategory(e.target.value)}
            />
            <input
              required
              type="number"
              defaultValue={item.quantity}
              className={`${style.listItem} ${
                errors.quantity ? style.errorBorder : ""
              }`}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          {/* Wrapping btns and description */}
          <div className={style.bot}>
            <textarea
              required
              className={`${style.desc} ${style.listItem} ${
                errors.description ? style.errorBorder : ""
              }`}
              name="description"
              id="desc"
              defaultValue={item.description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className={style.listItem}>
              <button className={style.deleteBtn} onClick={handleCancel}>
                Cancel
              </button>
              <button
                className={style.editBtn}
                onClick={handleSave}
                id={item.id}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Modal;
