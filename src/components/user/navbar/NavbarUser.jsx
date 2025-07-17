import { useEffect, useState } from "react";
import logo from "../../../assets/logo.svg";
import { Link } from "react-router-dom";
export default function NavbarUser() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={`fixed top-0 left-1/2 z-50 transform -translate-x-1/2 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "w-[55%] h-12 bg-[#222021] bg-opacity-90 shadow-md mt-3 rounded-[30px] p-3"
          : "  w-full h-20 bg-transparent"
      } `}
    >
      <div className="container mx-auto  flex justify-between items-center h-full text-white">
        <div className="flex items-center gap-2">
          <img src={logo} className="w-10 h-10" alt="" />
          <h1 className=" text-xl font-bold">Drivix</h1>
        </div>

        <ul className="flex space-x-6 font-semibold list-none ">
          <li className="hover:text-sky-500 transition-all duration-300">
            <Link to={"/drivix/user/homepage"}>Home</Link>
          </li>
          <li className="hover:text-sky-500 transition-all duration-300">
            <Link to={"/drivix/bengkel/terdekat"}>Bengkel Terdekat</Link>
          </li>
          <li className="hover:text-sky-500 transition-all duration-300">
            <Link to={"/drivix/tutorial/pages"}>Tutorial</Link>
          </li>
          <li className="hover:text-sky-500 transition-all duration-300">
            <Link to={"/drivix/tips/pages"}>Tips</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
