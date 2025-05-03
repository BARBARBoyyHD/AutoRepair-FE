import React from "react";
import { FaTrash } from "react-icons/fa";
import { BASE_URL } from "../../../../config/BaseUrl";
import axios from "axios";

const DeleteBengkel = ({ Bengkel_Id, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/delete/bengkel/${Bengkel_Id}`);
      if (onDeleteSuccess) {
        onDeleteSuccess(); // call parent to refresh list
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete tip.");
    }
  };

  return (
    <button onClick={handleDelete} className="cursor-pointer">
      <FaTrash />
    </button>
  );
};

export default DeleteBengkel;
