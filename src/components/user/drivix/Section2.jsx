import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../config/BaseUrl";
import { Link } from "react-router-dom";

const Section2 = () => {
  const [tips, setTips] = useState([]);
  const [error, setError] = useState("");

  const getAllTips = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/api/v1/get/all/tips`);
      const response = result.data.data;
      console.log("Tips: ", response);
      setTips(response);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch tips.");
    }
  };

  useEffect(() => {
    getAllTips();
  }, []);

  if (tips.length === 0) {
    return (
      <section className="h-[100vh] flex justify-center items-center">
        <h1 className="text-white text-3xl">Tips coming soon</h1>
      </section>
    );
  }

  return (
    <section className="min-h-[100vh] w-full flex justify-center items-center p-8 flex-col">
      <div className="flex justify-center flex-col items-center mb-4">
        <h1 className="text-white text-4xl font-bold">Tips & Trik </h1>
        <p className="text-white">
          Tips & Trik yang bisa kalian jadikan sebagai cara perawatan kendaraan
          kalian
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-6">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="text-black border w-full sm:w-[90%] md:w-[600px] lg:w-[450px] h-auto bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col"
          >
            <h2 className="text-2xl font-bold mb-5">{tip.Title}</h2>
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
              <div
                className="text-sm sm:w-[65%]"
                dangerouslySetInnerHTML={{ __html: tip.Description }}
              />
              <img
                src={tip.Image}
                alt={tip.Title}
                className="w-full sm:w-[35%] max-w-[180px] h-auto object-cover rounded-lg"
              />
            </div>
            <div>
              <Link
                to={`/somepage/${tip.id}`}
                className="mt-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center inline-block"
              >
                Buka
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Section2;
