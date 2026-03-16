


import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import "./ProductList.css";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/admin/auth/products")
      .then(res => setProducts(res.data));
  }, []);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exist = cart.find(item => item.id === product.id);

    if (exist) {
      exist.quantity = Number(exist.quantity) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  return (
    <div className="product-grid">
      {products.map(p => (
        <ProductCard 
          key={p.id} 
          product={p} 
          handleAddToCart={handleAddToCart} 
        />
      ))}
    </div>
  );
}

export default ProductList;