import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductList from './pages/products/ProductList';
import ProductEdit from './pages/products/ProductEdit';
import ProductAdd from './pages/products/ProductAdd';
import HomeContent from './components/HomeContent';
// import Nav from './layouts/nav/nav';
import Home from "./pages/home/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} >
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:productId/edit" element={<ProductEdit />} />
        <Route path="/products/add" element={<ProductAdd/>} />
        <Route path="/" element={<HomeContent />} />
      </Route>
    </Routes>
  );
};

export default App;
