import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../../config/BaseUrl";
import axios from "axios";
import { BiSearch } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../loading/LoadingSpinner";
const TutorialList = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(false);
  const getTutorialList = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`${BASE_URL}/api/v1/get/all/tutorial`);
      const response = result.data.data;
      console.log(response);
      setTutorials(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getTutorialList();
  }, []);

  return (
    <section className="h-[100vh] flex justify-center items-center flex-col gap-4">
      <div className="mt-8 relative w-full max-w-md">
        <BiSearch
          size={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-950"
        />
        <input
          type="search"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border border-black rounded-[8px] focus:outline-none"
        />
      </div>

      <div className="w-[1000px] h-[500px] p-8 rounded-[8px] bg-[#333333] flex gap-9 flex-wrap ">
        {loading ? (
          <div className="flex justify-center items-center w-full">
            <LoadingSpinner />
          </div>
        ) : (
          tutorials.map((tutorial, index) => (
            <div key={index}>
              <div className="w-[200px] h-[150px] rounded-[8px] gap-4">
                <img
                  src={tutorial.Thumbnail}
                  className="h-full w-full object-cover"
                  alt=""
                />
              </div>
              <div>
                <h1 className="text-white font-semibold">{tutorial.Title}</h1>
              </div>
              <div className="flex justify-end">
                <Link to={`/drivix/single/tutorial/${tutorial.Tutor_Id}`}>
                  <IoIosArrowForward className="text-white" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default TutorialList;
