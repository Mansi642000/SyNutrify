import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", { email, password });
      localStorage.setItem("token", res.data.token); // save token
      navigate("/dashboard"); // go to dashboard
    } catch (err) {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white pt-20">
      <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-700"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-700"
          required
        />
        <button type="submit" className="w-full p-2 bg-blue-500 rounded hover:bg-blue-600">
          Login
        </button>
        <p className="mt-3 text-sm">
          Don’t have an account?{" "}
          <span className="text-blue-400 cursor-pointer" onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
