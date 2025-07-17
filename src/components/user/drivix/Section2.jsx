import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../config/BaseUrl";
import { Link } from "react-router-dom";
import LoadingSpinner from "../loading/LoadingSpinner";
import StripHtml from "../../../lib/StripHtml";

const Section2 = () => {
  const [tips, setTips] = useState([]);
  const [filteredTips, setFilteredTips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const getAllTips = async () => {
      try {
        setLoading(true);
        const result = await axios.get(`${BASE_URL}/api/v1/get/all/tips`);
        const response = result.data.data;
        setTips(response);
        setFilteredTips(response);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch tips.");
      } finally {
        setLoading(false);
      }
    };

    getAllTips();
  }, []);

  useEffect(() => {
    const filtered = tips.filter((tip) => {
      const matchesCategory =
        category === "all" ||
        tip.category?.toLowerCase() === category.toLowerCase();
      const matchesSearch = tip.Title.toLowerCase().includes(
        search.toLowerCase()
      );
      return matchesCategory && matchesSearch;
    });

    setFilteredTips(filtered);
  }, [search, category, tips]);

  if (loading) {
    return (
      <section className="h-[100vh] flex justify-center items-center">
        <LoadingSpinner />
      </section>
    );
  }

  if (error) {
    return (
      <section className="h-[100vh] flex justify-center items-center">
        <h1 className="text-red-500">{error}</h1>
      </section>
    );
  }

  return (
    <section className="min-h-screen w-full flex flex-col items-center px-6 py-20">
      {/* Filter Bar */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
        <div className="flex gap-2">
          <select
            className="p-2 border rounded-md text-black"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">Semua</option>
            <option value="Ringan">Ringan</option>
            <option value="Berat">Berat</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Cari judul tips..."
          className="w-full sm:w-[300px] p-2 border rounded-md text-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Tips Cards */}
      <div className="flex flex-wrap justify-center items-center gap-6">
        {filteredTips.length === 0 ? (
          <p className="text-white">Tidak ada tips ditemukan.</p>
        ) : (
          filteredTips.map((tip, index) => (
            <div
              key={index}
              className="text-black w-full sm:w-[50%] md:w-[350px] lg:w-[350px] h-auto bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col"
            >
              <h2 className="text-2xl font-bold mb-5">{tip.Title}</h2>
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                {/* Truncated Text */}
                <div className="text-sm sm:w-[65%] text-black">
                  {StripHtml(tip.Description).slice(0, 100)}
                  {StripHtml(tip.Description).length > 100 ? "..." : ""}
                </div>

                {/* Image */}
                <img
                  src={tip.Image}
                  alt={tip.Title}
                  className="w-full sm:w-[35%] max-w-[180px] h-auto object-cover rounded-lg"
                />
              </div>

              <div>
                <Link
                  to={`/drivix/single/tips/${tip.Tips_Id}`}
                  className="mt-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center inline-block"
                >
                  Buka
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Section2;
