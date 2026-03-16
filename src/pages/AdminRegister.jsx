import { useState } from "react";
import axios from "axios";

export default function AdminRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/admin/auth/register", {
        username,
        password
      });
      alert(res.data);
    } catch (err) {
      console.error(err);
      alert("Error during registration");
    }
  };

  return (
    <div className="admin-register">
      <h2>Admin Register</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={register}>Register</button>
    </div>
  );
}
