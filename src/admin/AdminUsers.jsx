


import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get("http://localhost:8080/api/admin/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error("Failed to fetch users:", err));
  };

  // Delete user
  const deleteUser = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    axios.delete(`http://localhost:8080/api/admin/users/${id}`)
      .then(res => {
        alert(res.data.message);
        setUsers(prev => prev.filter(u => u.id !== id));
      })
      .catch(err => {
        const message = err.response?.data?.message || "Failed to delete user";
        alert(message);
        console.error("Delete failed:", err.response || err.message);
      });
  };

  // Block or Unblock user
  const toggleActive = (user) => {
    const action = user.active ? "block" : "unblock";

    axios.put(`http://localhost:8080/api/admin/users/${action}/${user.id}`)
      .then(res => {
        alert(res.data.message);
        setUsers(prev => prev.map(u => u.id === user.id ? { ...u, active: !u.active } : u));
      })
      .catch(err => {
        const message = err.response?.data?.message || "Failed to update user";
        alert(message);
        console.error("Update failed:", err.response || err.message);
      });
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1100px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "25px", color: "#2c3e50" }}>Manage Users</h2>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 10px", minWidth: "900px" }}>
          <thead style={{ backgroundColor: "#34495e", color: "#fff", textAlign: "left" }}>
            <tr>
              <th style={{ padding: "12px" }}>ID</th>
              <th style={{ padding: "12px" }}>Name</th>
              <th style={{ padding: "12px" }}>Email</th>
              <th style={{ padding: "12px" }}>Address</th>
              <th style={{ padding: "12px" }}>Phone</th>
              <th style={{ padding: "12px", textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={{ backgroundColor: "#ecf0f1", borderRadius: "6px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                <td style={{ padding: "12px", textAlign: "center" }}>{u.id}</td>
                <td style={{ padding: "12px" }}>{u.name}</td>
                <td style={{ padding: "12px" }}>{u.email}</td>
                <td style={{ padding: "12px" }}>{u.address}</td>
                <td style={{ padding: "12px" }}>{u.phone}</td>
                <td style={{ padding: "12px", display: "flex", gap: "10px", justifyContent: "center" }}>
                
                  <button
                    onClick={() => deleteUser(u.id)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#e74c3c",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      transition: "0.3s"
                    }}
                    onMouseOver={e => e.currentTarget.style.opacity = 0.8}
                    onMouseOut={e => e.currentTarget.style.opacity = 1}
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