import axios from "axios";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { BASE_URL } from "../../../../config/BaseUrl";

const DeleteTutorial = ({ Tutor_Id, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/v2/delete/tutorial/${Tutor_Id}`);
      if (onDeleteSuccess) {
        onDeleteSuccess(); // refresh list
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete tutorial.");
    }
  };
  return (
    <button onClick={handleDelete}>
      <FaTrash />
    </button>
  );
};

export default DeleteTutorial;
