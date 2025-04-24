import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../config/BaseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLoginComonents = () => {
  const [form, setForm] = useState({
    admin_name: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${BASE_URL}/api/v2/admin/login`, form);
        console.log(BASE_URL)
      if (res.status === 200) {
        // Example: store token and redirect
        navigate("/admin/dashboard/pages");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[100vh] flex justify-center items-center">
      <div className="w-full max-w-[400px] h-[400px] border border-slate-50 bg-black bg-opacity-50 rounded-[10px] p-4 text-slate-50">
        <h1 className="font-bold text-2xl text-center text-slate-50">
          Login Admin
        </h1>
        <form
          className="flex flex-col justify-center mt-2"
          onSubmit={handleSubmit}
        >
          <div className="gap-2 flex flex-col mb-2">
            <label className="font-semibold">Username</label>
            <input
              name="admin_name"
              value={form.admin_name}
              onChange={handleChange}
              className="border border-black p-2 rounded-md text-black"
              type="text"
              placeholder="Enter Your Username"
            />
          </div>
          <div className="gap-2 flex flex-col mb-2 text-black">
            <label className="font-semibold">Password</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              className="border border-black p-2 rounded-md"
              type="password"
              placeholder="Enter Your Password"
            />
          </div>

          {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="p-3 rounded-[8px] mt-4 bg-blue-600 font-bold text-white hover:bg-slate-200 hover:text-sky-600 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminLoginComonents;
