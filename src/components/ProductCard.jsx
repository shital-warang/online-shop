




import React from "react";

export default function ProductCard({ product, handleAddToCart }) {
  return (
    <div className="card h-100 shadow-sm">
     

      <img
  src={`/images/products/${product.imageUrl}`}
  alt={product.name}
  className="card-img-top"
  height="200"
/>

      <div className="card-body">
        <h5>{product.name}</h5>
        <p>{product.description}</p>
        <h6>₹ {product.price}</h6>
        <button className="btn btn-primary w-100" onClick={() => handleAddToCart(product)}>
          Add To Cart
        </button>
      </div>
    </div>
  );
}
