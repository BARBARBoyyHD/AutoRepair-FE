import React, { useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SuccessTutorial = ({ success, onClose }) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate(); // Create a navigate function

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        onClose();
        navigate("/admin/tutorial/pages"); // Replace '/your-route' with the path you want to navigate to
      }, 300); // Ensure the onClose function runs after the animation finishes
    }, 3000);

    // Cleanup timeout when the component unmounts or rerenders
    return () => clearTimeout(timer);
  }, [onClose, navigate]); // Add navigate to the dependency array

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className={`w-[80vw] sm:w-[60vw] md:w-[40vw] h-[30vw] sm:h-[20vw] md:h-[20vw] flex justify-center items-center rounded-lg bg-emerald-500 flex-col
          ${
            visible ? "scale-100 opacity-100" : "scale-50 opacity-0"
          } transition-all duration-300`}
      >
        <FaRegCheckCircle className="text-white sm:w-24 sm:h-24 md:w-32 md:h-32 w-16 h-16" />
        <h1 className="text-white font-bold sm:text-xl md:text-2xl text-lg">
          Success 
        </h1>
      </div>
    </div>
  );
};

export default SuccessTutorial;
