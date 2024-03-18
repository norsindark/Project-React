import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductAdd = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: ""
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/products",
        newProduct
      );
      console.log("Product added successfully:", response.data);
      window.alert("Product added successfully!");
      setNewProduct({ name: "", price: "", description: "" });
      navigate(`/products`);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="container">
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            className="description"
          ></textarea>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductAdd;
