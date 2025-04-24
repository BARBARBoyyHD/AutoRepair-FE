import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../config/BaseUrl";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

const AdminTipsList = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // <-- fixed typo from loadiing

  const getTipsList = async () => {
    setLoading(true); // Start loading
    try {
      const result = await axios.get(`${BASE_URL}/api/v2/list/tips`);
      const tipsData = result.data.data;
      console.log("TIPS LIST:", tipsData);
      setData(tipsData);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch tips. Please try again."
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    getTipsList();
  }, []);

  return (
    <section className="h-screen p-6 bg-gray-900 text-white rounded-[8px]">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-6 mt-6">Tips and Trick List</h1>
        <button className="w-[50px] h-[50px] rounded-[8px] bg-sky-700 font-bold flex justify-center items-center group hover:bg-sky-600 transition-all duration-300">
          <FaPlus
            className="transition-transform duration-300 group-hover:rotate-90"
            size={20}
          />
        </button>
      </div>

      {error && <div className="text-red-500 font-medium mb-4">{error}</div>}

      {loading ? (
        <div className="text-center py-10">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 mx-auto mb-4 animate-spin border-t-white"></div>
          <p>Loading tips...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.map((item, index) => (
            <div
              key={item.Tips_Id || index}
              className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={item.Thumbnail || item.Image}
                alt={item.Title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{item.Title}</h2>
                <p className="text-gray-300 text-sm">{item.Description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminTipsList;
