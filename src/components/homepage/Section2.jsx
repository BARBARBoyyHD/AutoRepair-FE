import React, { useEffect, useState } from "react";
import Precision from "../../assets/Precision.svg";
import Diamond from "../../assets/Diamond.svg";
import Security from "../../assets/Security.svg";

const features = [
  {
    icon: Precision,
    title: "Tips & Trik Perawatan",
    description: "Kami memberikan Tips & Trik Perawatan pada mobil anda",
  },
  {
    icon: Diamond,
    title: "Bengkel Terdekat",
    description: "Kami memberikan Tips & Trik Perawatan pada mobil anda",
  },
  {
    icon: Security,
    title: "Tutorial Dalam Keadaan Darurat",
    description: "Kami memberikan Tips & Trik Perawatan pada mobil anda",
  },
];

const Section2 = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1128);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1128);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="h-screen flex flex-col md:flex-row items-center justify-center text-white p-4">
      {/* Left Side */}
      <div className="w-full h-full flex items-center justify-center">
        <div className="max-w-[500px] flex flex-col gap-5">
          <h1
            className={`text-5xl font-semibold ${
              isMobile ? "text-center" : "text-left"
            }`}
          >
            Apa saja yang ada di website kami
          </h1>
          {!isMobile && (
            <div className="bg-CarBlack bg-cover bg-no-repeat bg-center w-full h-[300px] rounded-md"></div>
          )}
        </div>
      </div>

      {/* Right Side */}

      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-md">
          {features.map((feature, index) => (
            <div
              key={index}
              className="border-b-2 border-gray-600 p-6 flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <img src={feature.icon} alt={feature.title} />
                <h2 className="text-2xl font-semibold">{feature.title}</h2>
              </div>
              <p className="text-[#CCCCCC]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section2;
