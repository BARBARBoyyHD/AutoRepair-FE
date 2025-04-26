import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../config/BaseUrl";
import axios from "axios";
import DeleteTutorial from "../button/Tutorial/DeleteTutorial";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiPencilFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
const AdminTutorialList = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const handleAddNewTutorial = () => {
    navigate("/admin/add/new/tutorial");
  };
  const getTutorialList = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v2/list/tutorial`);
      const tutorialData = response.data.data;
      setData(tutorialData);
      console.log(tutorialData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getTutorialList();
  }, []);
  return (
    <section className="h-auto p-6 bg-gray-900 text-white rounded-[8px]">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Tutorial List</h1>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {data.map((item) => (
          <div
            key={item.Tutor_Id}
            className="bg-gray-800 hover:bg-gray-600 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
          >
            <img
              src={item.Thumbnail}
              alt={item.Title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{item.Title}</h2>
              <p className="text-gray-400 text-sm mb-4">{item.Description}</p>
              <div className="flex justify-between">
                <a
                  href={item.Link_Tutor}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:underline text-sm"
                >
                  Link Tutorial youtube
                </a>
                <div className="flex items-center gap-2">
                  <Link to={`/admin/tutorial/edit/${item.Tutor_Id}`}>
                    <RiPencilFill />
                  </Link>
                  <DeleteTutorial
                    Tutor_Id={item.Tutor_Id}
                    onDeleteSuccess={getTutorialList}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminTutorialList;
