import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles.css";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/products.json");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSort = () => {
    setSortType(sortType === "asc" ? "desc" : "asc");
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  let currentProducts = [];
  let filteredProducts = [];

  if (products && products.length > 0) {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const sortedProducts = currentProducts.sort((a, b) => {
      const isReversed = sortType === "asc" ? 1 : -1;
      return isReversed * String(a.price).localeCompare(String(b.price));
    });

    filteredProducts = sortedProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const handleEdit = (productId) => {
    navigate(`/products/${productId}/edit`);
  };

  const handleAdd = () => {
    navigate(`/products/add`);
  };

  const handleDelete = async (productId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/products/${productId}`);
        console.log("Product deleted successfully!");
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="title">
        <h1>Product List</h1>
        <button onClick={() => handleAdd()}>+</button>
      </div>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button className="btn btn-primary mb-3" onClick={handleSort}>
        Sort by Price {sortType === "asc" ? "↓" : "↑"}
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>
                <strong>{product.name}</strong>
              </td>
              <td>${product.price}</td>
              <td>{product.description}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(product.id)}>Edit</button>
                <button className="del" onClick={() => handleDelete(product.id)}>Del</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {products && products.length > productsPerPage && (
          <ul className="pagination">
            {Array.from({
              length: Math.ceil(products.length / productsPerPage),
            }).map((_, index) => (
              <li key={index} className="page-item">
                <button
                  className="page-link"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductList;
