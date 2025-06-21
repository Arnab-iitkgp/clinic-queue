import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice"; // 👈 import Redux action

export default function Signup() {
  const [name, setName] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminKey, setAdminKey] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch(); // 👈 use Redux dispatch

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/api/auth/signup`, {
        name,
        clinicName,
        email,
        password,
        adminKey,
      });

      // ✅ Use Redux login to store user + token
      dispatch(login({ user: res.data.user, token: res.data.token }));

      // ✅ Redirect
      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">
          Admin Signup
        </h2>
        <form onSubmit={handleSignup} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Clinic / Shop Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={clinicName}
            onChange={(e) => setClinicName(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Secret Admin Key"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Create Admin Account
          </button>
        </form>
      </div>
    </div>
  );
}
