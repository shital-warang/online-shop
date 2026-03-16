




import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get("http://localhost:8080/api/admin/products")
      .then(res => setProducts(res.data));
  };

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update Product
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      axios.put(`http://localhost:8080/api/admin/products/${editingId}`, form)
        .then(() => {
          fetchProducts();
          setEditingId(null);
          setForm({ name: "", price: "", description: "" });
        });
    } else {
      axios.post("http://localhost:8080/api/admin/products", form)
        .then(() => {
          fetchProducts();
          setForm({ name: "", price: "", description: "" });
        });
    }
  };

  // Delete product
  const deleteProduct = (id) => {
    axios.delete(`http://localhost:8080/api/admin/products/${id}`)
      .then(() => fetchProducts());
  };

  // Edit product
  const editProduct = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description
    });
  };

  return (
    <div style={{ padding: "30px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "20px" }}>Product Management</h2>

      {/* Add / Edit Form */}
      <form onSubmit={handleSubmit} style={{
        display: "flex",
        gap: "10px",
        marginBottom: "30px",
        flexWrap: "wrap"
      }}>
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ flex: "1 1 200px", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          style={{ flex: "1 1 100px", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          style={{ flex: "2 1 300px", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button type="submit" style={{
          padding: "10px 20px",
          border: "none",
          backgroundColor: editingId ? "#f39c12" : "#2ecc71",
          color: "#fff",
          borderRadius: "5px",
          cursor: "pointer"
        }}>
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Products Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          minWidth: "700px"
        }}>
          <thead style={{ backgroundColor: "#34495e", color: "#fff" }}>
            <tr>
              <th style={{ padding: "12px" }}>ID</th>
              <th style={{ padding: "12px" }}>Name</th>
              <th style={{ padding: "12px" }}>Price</th>
              <th style={{ padding: "12px" }}>Description</th>
              <th style={{ padding: "12px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px", textAlign: "center" }}>{p.id}</td>
                <td style={{ padding: "10px" }}>{p.name}</td>
                <td style={{ padding: "10px" }}>₹{p.price}</td>
                <td style={{ padding: "10px" }}>{p.description}</td>
                <td style={{ padding: "10px", display: "flex", gap: "10px", justifyContent: "center" }}>
                  <button
                    onClick={() => editProduct(p)}
                    style={{ padding: "5px 10px", backgroundColor: "#f39c12", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    style={{ padding: "5px 10px", backgroundColor: "#e74c3c", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



