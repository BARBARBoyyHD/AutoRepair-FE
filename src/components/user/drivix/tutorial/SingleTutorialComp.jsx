import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../../config/BaseUrl";
import axios from "axios";
import LoadingSpinner from "../../loading/LoadingSpinner";

const SingleTutorialComp = () => {
  const { Tutor_Id } = useParams();
  const [tutorialData, setTutorialData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSingleData = async () => {
    try {
      setLoading(true);
      const result = await axios.get(
        `${BASE_URL}/api/v2/single/tutorial/${Tutor_Id}`
      );
      const response = result.data.data;
      console.log(response);
      setTutorialData(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleData();
  }, []);

  return (
    <section className="min-h-screen bg-[#1e1e1e] flex justify-center items-center flex-col sm:p-10 p-4">
      <div className="w-full mt-8 max-w-4xl border border-gray-700 bg-[#2a2a2a] rounded-xl p-6 shadow-lg">
        {loading ? (
          <LoadingSpinner />
        ) : tutorialData ? (
          <div className="space-y-6">
            <h1 className="text-white font-extrabold text-4xl text-center">
              {tutorialData.Title}
            </h1>
            <img
              src={tutorialData.Thumbnail}
              alt={tutorialData.Title}
              className="w-full max-w-md rounded-lg mx-auto"
            />
            <div
              className="prose prose-invert max-w-none text-white"
              dangerouslySetInnerHTML={{ __html: tutorialData.Description }}
            />
            <a
              href={tutorialData.Link_Tutor}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Lihat Tutorial
            </a>
          </div>
        ) : (
          <div className="text-white">Not found</div>
        )}
      </div>
    </section>
  );
};

export default SingleTutorialComp;
