import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/api/auth/login`, {
        email,
        password,
      });

      // ✅ Dispatch login to Redux
      dispatch(login({ user: res.data.user, token: res.data.token }));

      // ✅ Navigate based on role
      if (res.data.user.role === "receptionist") {
        navigate("/receptionist");
      } else if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        alert("Unknown user role");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="from-slate-50 to-slate-200 flex items-center justify-center px-4 py-16">
      <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-xl p-8 sm:p-10 w-full max-w-md border border-slate-300">
        <h2 className="text-3xl font-bold text-slate-800 text-center mb-6">
          Sign in to QueueMate
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="reception@example.com"
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Continue
          </button>
        </form>

        <div className="mt-6 text-sm text-slate-600 text-center space-y-2">
          <p>
            Are you an admin?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 font-medium hover:underline"
            >
              Create an account
            </Link>
          </p>
          <p>
            Don’t have an account?{" "}
            <span className="text-indigo-600 font-medium hover:underline cursor-pointer">
              Contact admin
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
