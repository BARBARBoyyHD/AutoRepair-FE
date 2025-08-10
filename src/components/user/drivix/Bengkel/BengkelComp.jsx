import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../../config/BaseUrl";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../loading/LoadingSpinner";
import MapBoxList from "./MapBoxList";

const BengkelComp = () => {
  const [search, setSearch] = useState("");
  const [allBengkel, setAllBengkel] = useState([]);
  const [filteredBengkel, setFilteredBengkel] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedBengkel, setSelectedBengkel] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1128);

  const navigate = useNavigate();

  const handleMobile = () => {
    setIsMobile(window.innerWidth < 1128);
  };

  const fetchAllBengkel = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/v2/all/bengkel`);
      const data = res.data.data;
      setAllBengkel(data);
      setFilteredBengkel(data);
    } catch (err) {
      console.error("Failed to fetch all bengkels:", err);
    } finally {
      setLoading(false);
    }
  };

  // Search handler (local filtering)
  const handleSearch = (value) => {
    setSearch(value);
    const query = value.toLowerCase();
    if (!query) {
      setFilteredBengkel(allBengkel);
      return;
    }
    const filtered = allBengkel.filter(
      (b) =>
        b.Bengkel_name.toLowerCase().includes(query) ||
        b.Address.toLowerCase().includes(query)
    );
    setFilteredBengkel(filtered);
  };

  const goToBengkelSingle = (id) => {
    navigate(`/drivix/single/bengkel/${id}`);
  };

  const renderSideBar = () => {
    return (
      <div className="w-[350px] bg-white shadow-md overflow-y-auto mt-[100px] flex flex-col">
        {/* Search bar */}
        <div className="flex items-center border-b border-gray-300 p-2">
          <BiSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search by name or address"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-1 outline-none p-1 text-sm"
          />
        </div>

        {loading && <LoadingSpinner />}

        <div className="p-4">
          {filteredBengkel.length > 0 ? (
            filteredBengkel.map((b) => (
              <div
                key={b.Bengkel_Id}
                className="mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded"
                onClick={() => setSelectedBengkel(b)}
              >
                <h3 className="text-lg font-semibold">{b.Bengkel_name}</h3>
                <p className="text-sm text-gray-600">{b.Address}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToBengkelSingle(b.Bengkel_Id);
                  }}
                  className="text-blue-500 text-xs mt-1 underline"
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No results found</p>
          )}
        </div>
      </div>
    );
  };
  const renderSideBarMobile = () => {
    return (
      <div className="bg-white shadow-md border-t border-gray-200 overflow-x-auto flex flex-col gap-4 p-4">
        {filteredBengkel.map((b) => (
          <div
            key={b.Bengkel_Id}
            className="min-w-[250px] bg-gray-50 p-3 rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => setSelectedBengkel(b)}
          >
            <h3 className="text-base font-semibold">{b.Bengkel_name}</h3>
            <p className="text-xs text-gray-600 truncate">{b.Address}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToBengkelSingle(b.Bengkel_Id);
              }}
              className="text-blue-500 text-xs mt-1 underline"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    );
  };
  // Initial data fetch
  useEffect(() => {
    fetchAllBengkel();
  }, []);

  // Geolocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation([pos.coords.longitude, pos.coords.latitude]);
    });
  }, []);

  // Handle resize for mobile
  useEffect(() => {
    handleMobile();
    window.addEventListener("resize", handleMobile);
    return () => window.removeEventListener("resize", handleMobile);
  }, []);

  return (
    <section className="h-screen flex">
      {isMobile ? (
        <div className="flex flex-col w-full h-[calc(150vh-150px)] mt-[100px]">
          <div className="flex-1">
            <MapBoxList
              bengkelList={allBengkel} // always show all markers
              userLocation={userLocation}
              selectedBengkel={selectedBengkel}
            />
          </div>
          <div className="h-1/2 overflow-y-auto flex-row">
            {renderSideBarMobile()}
          </div>
        </div>
      ) : (
        <>
          {renderSideBar()}
          <div className="flex-1 h-[calc(100vh-100px)] mt-[100px]">
            <MapBoxList
              bengkelList={allBengkel} // always show all markers
              userLocation={userLocation}
              selectedBengkel={selectedBengkel}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default BengkelComp;
