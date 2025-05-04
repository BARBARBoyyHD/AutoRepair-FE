import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../../config/BaseUrl";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const BengkelComp = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const navigate = useNavigate();
  const handleSearch = async () => {
    try {
      const result = await axios.get(
        `${BASE_URL}/api/v1/bengkel?search=${encodeURIComponent(search)}`
      );
      const response = result.data.data;
      setResult(response);
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  const goToBengkelSingle = (item_id) => {
    navigate(`/drivix/single/bengkel/${item_id}`);
  };

  useEffect(() => {}, []);

  return (
    <section className="h-screen flex flex-col items-center">
      {/* Search Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="flex gap-2 mt-[100px]"
      >
        <div className="relative w-full max-w-sm">
          <BiSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500"
            size={20}
          />
          <input
            type="text"
            placeholder="Type anything"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="text-white px-5 py-1 rounded-[6px] bg-sky-700 font-bold"
        >
          Search
        </button>
      </form>

      {/* Scrollable Result Area */}
      <div className="mt-4 w-full px-4 overflow-y-auto flex-1 bg-bengkelBg bg-cover bg-center bg-no-repeat">
        {result.map((item, index) => (
          <div
            key={index}
            onClick={() => goToBengkelSingle(item.Bengkel_Id)}
            className="bg-white/10 backdrop-blur-md rounded-lg p-4 mb-6 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center gap-4"
          >
            <img
              src={item.image}
              alt={item.Bengkel_name}
              className="w-full md:w-48 h-auto object-cover rounded-md"
            />
            <div className="flex flex-col">
              <h1 className="text-lg md:text-xl font-semibold mb-1">
                {item.Bengkel_name}
              </h1>
              <p className="text-sm mb-1">{item.Address}</p>
              <div
                className="text-sm mb-1"
                dangerouslySetInnerHTML={{ __html: item.Description }}
              ></div>
              <p className="text-sm mb-2">{item.Phone_Number}</p>
              {item.Link && (
                <a
                  href={item.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline text-sm"
                >
                  Visit Website
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BengkelComp;
