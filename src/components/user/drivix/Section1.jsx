import React from "react";

const Section1 = () => {
  return (
    <section className="h-[100vh] flex justify-center items-center">
      <div className="w-full h-full flex items-center justify-center flex-col gap-4 p-6">
        <h1 className="text-white  w-[350px] text-4xl font-bold">
          Solusi Darurat Mobil Anda Cepat, Tepat, dan Selalu Siap di Mana Saja
        </h1>
        <p className=" w-[350px] text-white text-[15px]">
          Kalian bisa melihat informasi-informasi tentang kerusakaan mobil
          dengan mengklik tombol di bawah
        </p>
      </div>
      <div className="w-full h-[60vh] hidden sm:flex items-center justify-center bg-CarUser bg-no-repeat bg-cover bg-center rounded-[8px]"></div>
    </section>
  );
};

export default Section1;
