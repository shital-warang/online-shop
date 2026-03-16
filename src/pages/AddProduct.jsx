import { useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const addProduct = async () => {
    await axios.post("http://localhost:8080/api/admin/auth/products", {
      name, price
    });
    alert("Product Added");
  };

  return (
    <div>
      <h2>Add Product</h2>
      <input placeholder="Name" onChange={e=>setName(e.target.value)} />
      <input placeholder="Price" onChange={e=>setPrice(e.target.value)} />
      <button onClick={addProduct}>Add</button>
    </div>
  );
}
