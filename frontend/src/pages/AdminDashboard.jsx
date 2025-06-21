import { useEffect, useState } from "react";
import axios from "axios";
import LogoutButton from "../components/LogoutButton"; 
import { Link } from "react-router-dom";
export default function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [receptionists, setReceptionists] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setAdmin(JSON.parse(userData));
    }

    // Fetch receptionists from DB
    const fetchReceptionists = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/receptionists", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReceptionists(res.data);
      } catch (err) {
        console.error("Failed to load receptionists:", err);
      }
    };

    fetchReceptionists();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateReceptionist = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/receptionists",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Receptionist created!");
      // Add to list
      setReceptionists((prev) => [...prev, res.data.user]);
      setForm({ name: "", email: "", password: "" }); // Reset form
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error creating receptionist");
    }
  };
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/receptionists/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReceptionists((prev) => prev.filter((r) => r._id !== id));
      alert("🗑️ Receptionist deleted!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  return (
    <div className=" py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
  <h1 className="text-3xl font-bold text-indigo-700">
    Welcome, {admin?.name}
  </h1>
  <div className="flex items-center gap-4">
   <Link
  to="/receptionist"
  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-center"
>
  Receptionist Portal
</Link>
    <LogoutButton />
  </div>
</div>


        <p className="text-gray-600 mb-6">Clinic: {admin?.clinicName}</p>
        {/* 👥 Receptionist List */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            👥 Receptionists
          </h2>
          <ul className="space-y-2">
            {receptionists.map((r, index) => (
              <li
                key={r._id}
                className="bg-slate-50 p-3 rounded-md shadow-sm text-sm flex justify-between items-center"
              >
                <span>
                  📋 {r.name} ({r.email})
                </span>
                <button
                  className="text-red-600 text-sm hover:underline"
                  onClick={() => handleDelete(r._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* ➕ Add Receptionist */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            ➕ Add Receptionist
          </h2>
          <form
            onSubmit={handleCreateReceptionist}
            className="grid sm:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Receptionist Name"
              value={form.name}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Receptionist Email"
              value={form.email}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Temporary Password"
              value={form.password}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
            <button
              type="submit"
              className="sm:col-span-2 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Create Receptionist
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
