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

  const navigate = useNavigate();

  // Get all bengkels on first load
  useEffect(() => {
    const fetchAllBengkel = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/api/v2/all/bengkel`);
        const data = res.data.data;
        console.log(data)
        setAllBengkel(data);
        setFilteredBengkel(data);
      } catch (err) {
        console.error("Failed to fetch all bengkels:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllBengkel();
  }, []);

  // Geolocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.longitude, pos.coords.latitude]);
      },
      () => {
        setUserLocation([107.6186, -6.9175]); // fallback Bandung
      }
    );
  }, []);

  // Search handler
  const handleSearch = async () => {
    if (!search) {
      setFilteredBengkel(allBengkel); // Reset to all
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}/api/v1/bengkel?search=${encodeURIComponent(search)}`
      );
      const data = res.data.data;
      setFilteredBengkel(data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const goToBengkelSingle = (id) => {
    navigate(`/drivix/single/bengkel/${id}`);
  };

  return (
    <section className="h-screen flex">
      {/* Sidebar */}
      <div className="w-[350px] bg-white p-4 shadow-md overflow-y-auto mt-[100px]">
        {/* <div className="flex mb-4 items-center gap-2">
          <input
            type="text"
            className="border rounded p-2 w-full"
            placeholder="Search Bengkel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>
            <BiSearch size={24} />
          </button>
        </div> */}

        {loading && <LoadingSpinner />}

        {filteredBengkel.map((b) => (
          <div
            key={b.Bengkel_Id}
            className="mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded"
            onClick={() => setSelectedBengkel(b)}
          >
            <h3 className="text-lg font-semibold">{b.Bengkel_name}</h3>
            <p className="text-sm text-gray-600">{b.Address}</p>
            <button
              onClick={() => goToBengkelSingle(b.Bengkel_Id)}
              className="text-blue-500 text-xs mt-1 underline"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Map */}
      <div className=" mt-[100px] flex-1 h-full">
        <MapBoxList
          bengkelList={allBengkel}
          userLocation={userLocation}
          selectedBengkel={selectedBengkel}
        />
      </div>
    </section>
  );
};

export default BengkelComp;
