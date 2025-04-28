import React from "react";

const Section1 = () => {
  return (
    <section className="h-[100vh] flex items-center justify-center bg-HomePage bg-cover bg-no-repeat bg-center w-full text-white flex-col">
      <div className="w-full h-full flex justify-center items-end mb-10">
        <div className="flex flex-col justify-center w-full items-center gap-2">
          <h1 className="text-3xl font-semibold text-6xl">Drivix</h1>
          <p className="text-[15px] h-auto w-[350px] text-center p-2 ">
            Solusi Darurat Mobil Anda Cepat, Tepat, dan Selalu Siap di Mana Saja
          </p>
          <button className="px-4 py-1 rounded-[6px] bg-slate-100 text-slate-950 font-semibold hover:bg-slate-950 hover:text-slate-100 transition-all duration-300">
            Explore Now
          </button>
        </div>
      </div>
      <div className="w-full h-full bg-CarHomePage bg-cover bg-no-repeat bg-center sm:bg-top"></div>
    </section>
  );
};

export default Section1;
