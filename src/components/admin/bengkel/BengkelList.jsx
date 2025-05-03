import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../config/BaseUrl";
import DeleteBengkel from "../button/bengkel/DeleteBengkel";
import LoadingSpinner from "../loading/LoadingSpinner";

const BengkelList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleAddNewTutorial = () => {
    navigate("/admin/add/bengkel/pages");
  };
  const getAllBengkel = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/v2/all/bengkel`);
      const bengkelData = response.data.data;
      setData(bengkelData);
      console.log(bengkelData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllBengkel();
  }, []);

  return (
    <section className="h-auto p-6 bg-gray-900 text-white rounded-[8px]">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Bengkel List</h1>
        <button
          onClick={handleAddNewTutorial}
          className="w-[50px] h-[50px] rounded-[8px] bg-sky-700 font-bold flex justify-center items-center group hover:bg-sky-600 transition-all duration-300"
        >
          <FaPlus
            className="transition-transform duration-300 group-hover:rotate-90"
            size={20}
          />
        </button>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800 hover:bg-gray-600 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.Bengkel_name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  {item.Bengkel_name}
                </h2>
                <p className="text-gray-400 text-sm mb-4">{item.Description}</p>
                <p className="text-gray-400 text-sm mb-4">
                  Phone : {item.Phone_Number}
                </p>
                <p className="text-gray-400 text-sm mb-4">
                  Longitude : {item.Coordinate_X}
                </p>
                <p className="text-gray-400 text-sm mb-4">
                  Latitude: {item.Coordinate_Y}
                </p>
                <div className="flex justify-between">
                  <a
                    href={item.Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:underline text-sm"
                  >
                    Link Tutorial youtube
                  </a>
                  <div className="flex items-center gap-2">
                    <Link to={`/admin/edit/bengkel/${item.Bengkel_Id}`}>
                      <RiPencilFill />
                    </Link>
                    <DeleteBengkel
                      Bengkel_Id={item.Bengkel_Id}
                      onDeleteSuccess={getAllBengkel}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default BengkelList;
