import React from "react";
import { FaTrash } from "react-icons/fa";
import { BASE_URL } from "../../../../config/BaseUrl";
import axios from "axios";

const DeleteTips = ({ Tips_Id, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/v2/delete/tips/${Tips_Id}`);
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

export default DeleteTips;
