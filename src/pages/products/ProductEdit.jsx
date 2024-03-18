import React, { useState, useEffect } from "react";
import "./Styles.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductEdit = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/products/${productId}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleUpdate = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (isConfirmed) {
      try {
        await axios.put(`http://localhost:3000/products/${productId}`, product);
        window.alert("Product updated successfully!");
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Edit Product</h1>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          name="price"
          value={product.price}
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
          value={product.description}
          onChange={handleChange}
          className="description"
        ></textarea>
      </div>

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default ProductEdit;
