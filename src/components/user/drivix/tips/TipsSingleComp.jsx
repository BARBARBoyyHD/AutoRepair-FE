import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../../config/BaseUrl";
import axios from "axios";
import LoadingSpinner from "../../loading/LoadingSpinner";

const TipsSingleComp = () => {
  const { Tips_Id } = useParams();
  const [tipsData, setTipsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const getSingleTips = async () => {
    try {
      setLoading(true);
      const result = await axios.get(
        `${BASE_URL}/api/v2/single/tips/${Tips_Id}`
      );
      const response = result.data.data;
      setTipsData(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleTips();
  }, []);

  return (
    <section className="min-h-[100vh] w-full flex justify-center items-center p-8 flex-col ">
      <div className="mt-[100px] flex justify-center flex-col items-center mb-4">
        <h1 className="text-white text-4xl font-bold">Tips & Trik </h1>
        <p className="text-white">
          Tips & Trik yang bisa kalian jadikan sebagai cara perawatan kendaraan
          kalian
        </p>
      </div>
      <div className="min-h-screen flex justify-center items-center flex-col sm:p-10 w-full">
        <div className="w-full max-w-5xl mt-8 bg-[#2a2a2a] rounded-xl p-8 ">
          {loading ? (
            <LoadingSpinner />
          ) : tipsData ? (
            <div className="w-full space-y-6">
              <iframe src={tipsData.link} className="w-full aspect-video rounded-[8px]" allow="autoplay" allowFullScreen/>
              <h1 className="text-4xl text-white font-bold">
                {tipsData.Title}
              </h1>

              <div className="flex flex-col lg:flex-row gap-8 ">
                <div
                  className="prose prose-invert max-w-none text-white"
                  dangerouslySetInnerHTML={{ __html: tipsData.Description }}
                />
              </div>
            </div>
          ) : (
            <p className="text-white text-center"> Tips Not Found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TipsSingleComp;
