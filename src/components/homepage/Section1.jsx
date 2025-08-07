import React from "react";
import { useNavigate } from "react-router-dom";

const Section1 = () => {
  const navigate = useNavigate();
  const handleLoginPage = () => {
    navigate("/user/login/pages");
  };
  return (
    <section className="h-[100vh] flex items-center justify-center bg-HomePage bg-cover bg-no-repeat bg-center w-full text-white flex-col">
      <div className="w-full h-full flex justify-center items-end mb-10">
        <div className="flex flex-col justify-center w-full items-center gap-2">
          <h1 className="sm:text-3xl font-semibold text-6xl">Drivix</h1>
          <p className="text-[15px] h-auto w-[350px] text-center p-2 ">
            Solusi Darurat Mobil Anda Cepat, Tepat, dan Selalu Siap di Mana Saja
          </p>
        
        </div>
      </div>
      <div className="w-full h-full bg-CarHomePage bg-cover bg-no-repeat bg-center sm:bg-top"></div>
    </section>
  );
};

export default Section1;
