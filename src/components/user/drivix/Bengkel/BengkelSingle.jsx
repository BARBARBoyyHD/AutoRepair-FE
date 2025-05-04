import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../../config/BaseUrl";
import MapBox from "./MapBox";
import axios from "axios";

const BengkelSingle = () => {
  const { Bengkel_Id } = useParams();
  const [result, setResult] = useState({});

  const getSingleBengkel = async () => {
    try {
      const result = await axios.get(
        `${BASE_URL}/api/v2/single/bengkel/${Bengkel_Id}`
      );
      const response = result.data.data;
      setResult(response);
    } catch (error) {
      console.error("error : ", error);
    }
  };

  useEffect(() => {
    getSingleBengkel();
  }, []);

  return (
    <section className="min-h-screen pt-[50px] sm:pt-[100px] px-4 bg-bengkelBg bg-cover bg-center bg-no-repeat ">
      <div className=" ">
        {result && (
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 mb-6 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center gap-6">
            <img
              src={result.image}
              alt={result.Bengkel_name}
              className="w-full md:w-64 h-auto object-cover rounded-lg"
            />
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold mb-2">{result.Bengkel_name}</h1>
              <p className="text-sm mb-1">{result.Address}</p>
              <div
                className="text-sm mb-2"
                dangerouslySetInnerHTML={{ __html: result.Description }}
              ></div>
              <p className="text-sm mb-3">{result.Phone_Number}</p>
              {result.Link && (
                <a
                  href={result.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline text-sm"
                >
                  More
                </a>
              )}
            </div>
          </div>
        )}
      </div>
      <div>
        {result.Coordinate_X && result.Coordinate_Y && result.Bengkel_name && (
          <MapBox
            Coordinate_X={result.Coordinate_X}
            Coordinate_Y={result.Coordinate_Y}
            Bengkel_name={result.Bengkel_name}
          />
        )}
      </div>
    </section>
  );
};

export default BengkelSingle;
