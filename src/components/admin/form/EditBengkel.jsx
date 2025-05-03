import React, { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../../../config/BaseUrl";
import SuccessBengkel from "../alert/SuccessBengkel";
import LoadingSpinner from "../loading/LoadingSpinner";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditBengkel = () => {
  const { Bengkel_Id } = useParams();
  const [formData, setFormData] = useState({
    Bengkel_name: "",
    Address: "",
    Phone_Number: "",
    Description: "",
    Link_Tutor: "",
    Coordinate_X: "",
    Coordinate_Y: "",
    Link: "",
    Image: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const editorRef = useRef(null); // Ref for the contenteditable div

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    setFormData({ ...formData, [name]: file });
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleEditorChange = () => {
    if (editorRef.current) {
      setFormData({ ...formData, Description: editorRef.current.innerHTML });
    }
  };

  const handleTextFormatting = (command) => {
    if (editorRef.current) {
      document.execCommand(command);
      handleEditorChange();
    }
  };

  const getsingleBengkel = async () => {
    try {
      const result = await axios.get(
        `${BASE_URL}/api/v2/single/bengkel/${Bengkel_Id}`
      );
      const response = result.data.data;
      console.log("Bengkel : ", response);
      setFormData({
        Bengkel_name: response.Bengkel_name || "",
        Address: response.Address || "",
        Phone_Number: response.Phone_Number || "",
        Description: response.Description || "",
        Link_Tutor: response.Link_Tutor || "",
        Coordinate_X: response.Coordinate_X || "",
        Coordinate_Y: response.Coordinate_Y || "",
        Link: response.Link || "",
        Image: response.image || null,
      });
      setImagePreview(response.image);
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting the form.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("Bengkel_name", formData.Bengkel_name);
    formDataToSend.append("Address", formData.Address);
    formDataToSend.append("Phone_Number", Number(formData.Phone_Number));
    formDataToSend.append("Description", formData.Description);
    formDataToSend.append("Link_Tutor", formData.Link_Tutor);
    formDataToSend.append("Coordinate_X", parseFloat(formData.Coordinate_X));
    formDataToSend.append("Coordinate_Y", parseFloat(formData.Coordinate_Y));
    formDataToSend.append("Link", formData.Link);
    formDataToSend.append("Image", formData.Image);

    try {
      const response = await fetch(
        `${BASE_URL}/api/v2/bengkel/edit/${Bengkel_Id}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      const result = await response.json();
      if (response.ok) {
        setSuccess(true);
      } else {
        alert(result.message || "Error adding bengkel");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getsingleBengkel();
  }, [Bengkel_Id]);

  return (
    <section className=" p-6 text-white rounded-lg">
      <h1 className="text-2xl mb-6">Edit Bengkel</h1>

      {success && (
        <div className="fixed inset-0 z-50">
          <SuccessBengkel success={success} onClose={() => setSuccess(false)} />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg mb-2" htmlFor="Bengkel_name">
            Bengkel Name
          </label>
          <input
            type="text"
            id="Bengkel_name"
            name="Bengkel_name"
            value={formData.Bengkel_name}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-700"
            placeholder="Enter the workshop name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg mb-2" htmlFor="Address">
            Address
          </label>
          <input
            type="text"
            id="Address"
            name="Address"
            value={formData.Address}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-700"
            placeholder="Enter the address"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg mb-2" htmlFor="Phone_Number">
            Phone Number
          </label>
          <input
            type="number"
            id="Phone_Number"
            name="Phone_Number"
            value={formData.Phone_Number}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-700"
            placeholder="Enter the phone number"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg mb-2" htmlFor="Coordinate_X">
            Coordinate X
          </label>
          <input
            type="number"
            step="any"
            id="Coordinate_X"
            name="Coordinate_X"
            value={formData.Coordinate_X}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-700"
            placeholder="Enter X coordinate"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg mb-2" htmlFor="Coordinate_Y">
            Coordinate Y
          </label>
          <input
            type="number"
            step="any"
            id="Coordinate_Y"
            name="Coordinate_Y"
            value={formData.Coordinate_Y}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-700"
            placeholder="Enter Y coordinate"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg mb-2" htmlFor="Link">
            Link
          </label>
          <input
            type="text"
            id="Link"
            name="Link"
            value={formData.Link}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-700"
            placeholder="Enter the website or reference link"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg mb-2" htmlFor="Image">
            Image
          </label>
          <input
            type="file"
            id="Image"
            name="Image"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-700"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 w-48 h-auto rounded-md border border-gray-500"
            />
          )}
        </div>

        <div className="mb-4">
          <label className="block text-lg mb-2" htmlFor="Description">
            Description
          </label>
          <div className="flex flex-wrap items-center">
            <div className="flex items-center space-x-1 rtl:space-x-reverse flex-wrap">
              <button
                type="button"
                onClick={() => handleTextFormatting("bold")}
                className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 5h4.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0-7H6m2 7h6.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0 0H6"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => handleTextFormatting("italic")}
                className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m8.874 19 6.143-14M6 19h6.33m-.66-14H18"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => handleTextFormatting("underline")}
                className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M6 19h12M8 5v9a4 4 0 0 0 8 0V5M6 5h4m4 0h4"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => handleTextFormatting("strikeThrough")}
                className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 6.2V5h12v1.2M7 19h6m.2-14-1.677 6.523M9.6 19l1.029-4M5 5l6.523 6.523M19 19l-7.477-7.477"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div
            ref={editorRef}
            contentEditable="true"
            className="p-4 mt-4 border border-gray-300 h-[20vw] rounded-lg dark:bg-gray-700 dark:border-gray-600"
            onInput={handleEditorChange}
            dangerouslySetInnerHTML={{ __html: formData.Description }}
          >
            {/* Rich text content goes here */}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md"
        >
          {loading ? <LoadingSpinner /> : "Edit Bengkel"}
        </button>
      </form>
    </section>
  );
};

export default EditBengkel;
