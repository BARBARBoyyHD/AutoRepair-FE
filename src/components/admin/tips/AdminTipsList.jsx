import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../config/BaseUrl";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { RiPencilFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import DeleteTips from "../button/tips/DeleteTips";
import LoadingSpinner from "../loading/LoadingSpinner";
import StripHtml from "../../../lib/StripHtml";

const AdminTipsList = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // <-- fixed typo from loadiing
  const navigate = useNavigate();

  const handleAddNewTips = () => {
    navigate("/admin/add/new/tips");
  };
  const getTipsList = async () => {
    setLoading(true); // Start loading
    try {
      const result = await axios.get(`${BASE_URL}/api/v2/list/tips`);
      const tipsData = result.data.data;
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
    <section className="min-h-[100dvh]">
      <div className="min-h-auto p-6 bg-gray-900 text-white rounded-[8px]">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-6 mt-6">Tips and Trick List</h1>
          <button
            onClick={handleAddNewTips}
            className="w-[50px] h-[50px] rounded-[8px] bg-sky-700 font-bold flex justify-center items-center group hover:bg-sky-600 transition-all duration-300"
          >
            <FaPlus
              className="transition-transform duration-300 group-hover:rotate-90"
              size={20}
            />
          </button>
        </div>

        {error && <div className="text-red-500 font-medium mb-4">{error}</div>}

        {loading ? (
          <div className="flex justify-center  items-center h-[70dvh]">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data.map((item, index) => (
              <div
                key={item.Tips_Id || index}
                className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:bg-slate-300 hover:text-slate-800 transition-all duration-300"
              >
                <img
                  src={item.Thumbnail || item.Image}
                  alt={item.Title}
                  className="w-full h-48 object-cover"
                />
                <div className="flex justify-between items-center">
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{item.Title}</h2>
                    <p className="text-gray-600 text-sm hover:text-slate-800">
                      {StripHtml(item.Description).slice(0, 200)}
                      {StripHtml(item.Description).length > 200 ? "..." : ""}
                    </p>
                  </div>
                  <div className="p-3 flex gap-3">
                    <Link to={`/admin/tips/edit/${item.Tips_Id}`}>
                      <RiPencilFill />
                    </Link>
                    <DeleteTips
                      Tips_Id={item.Tips_Id}
                      onDeleteSuccess={getTipsList}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminTipsList;
