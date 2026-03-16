



import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Home = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === category));
    }
  }, [category, products]);

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex(item => item.id === product.id);

    if (index !== -1) {
      cart[index].quantity = Number(cart[index].quantity) + 1;
    } else {
      cart.push({
        ...product,
        quantity: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Products</h3>

      <div className="row">
        {filteredProducts.map(product => (
          <div className="col-md-3 mb-4" key={product.id}>
            <ProductCard product={product} handleAddToCart={handleAddToCart} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;