import React, { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../../../config/BaseUrl";
import SuccessTutorial from "../alert/SuccessTutorial";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../loading/LoadingSpinner";

const EditTutorial = () => {
  const { Tutor_Id } = useParams();
  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    Link_Tutor: "",
    Thumbnail: null,
  });

  const [currentThumbnail, setCurrentThumbnail] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        Thumbnail: files[0],
      }));
    }
  };

  const handleEditorChange = () => {
    if (editorRef.current) {
      setFormData((prevData) => ({
        ...prevData,
        Description: editorRef.current.innerHTML,
      }));
    }
  };

  const handleTextFormatting = (command) => {
    if (editorRef.current) {
      document.execCommand(command, false, null);
      handleEditorChange();
    }
  };

  const getSingleTutorial = async () => {
    setLoading(true);
    try {
      const result = await fetch(
        `${BASE_URL}/api/v2/single/tutorial/${Tutor_Id}`
      );
      const response = await result.json();

      if (response?.data) {
        setFormData({
          Title: response.data.Title || "",
          Description: response.data.Description || "",
          Link_Tutor: response.data.Link_Tutor || "",
          Thumbnail: null, // Only set new file if re-uploaded
        });
        setCurrentThumbnail(response.data.Thumbnail || null);

        if (editorRef.current) {
          editorRef.current.innerHTML = response.data.Description || "";
        }
      } else {
        setError("Failed to fetch tutorial data.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching tutorial details.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("Title", formData.Title);
    formDataToSend.append("Description", formData.Description);
    formDataToSend.append("Link_Tutor", formData.Link_Tutor);
    if (formData.Thumbnail) {
      formDataToSend.append("Thumbnail", formData.Thumbnail);
    }

    try {
      const response = await fetch(
        `${BASE_URL}/api/v2/update/tutorial/${Tutor_Id}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      const result = await response.json();
      if (response.ok) {
        setSuccess(true);
      } else {
        alert(result.message || "Error updating tutorial");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleTutorial();
  }, []);

  return (
    <section className="p-6 text-white rounded-lg">
      <h1 className="text-2xl mb-6">Edit Tutorial</h1>

      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <SuccessTutorial
            success={success}
            onClose={() => setSuccess(false)}
            message="Success Updating Tutorial"
          />
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg mb-2" htmlFor="Title">
            Title
          </label>
          <input
            type="text"
            id="Title"
            name="Title"
            value={formData.Title}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-700"
            placeholder="Enter the title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg mb-2" htmlFor="Link_Tutor">
            Link Tutorial
          </label>
          <input
            type="text"
            id="Link_Tutor"
            name="Link_Tutor"
            value={formData.Link_Tutor}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-700"
            placeholder="Enter the Link tutorial"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg mb-2" htmlFor="Thumbnail">
            Thumbnail Image
          </label>
          {currentThumbnail && (
            <div className="mb-2">
              <p className="mb-1">Current Thumbnail Preview:</p>
              <img
                src={currentThumbnail}
                alt="Current Thumbnail"
                className="h-32 w-auto object-cover rounded"
              />
            </div>
          )}
          <input
            type="file"
            id="Thumbnail"
            name="Thumbnail"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-700"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg mb-2" htmlFor="Description">
            Description
          </label>

          <div className="flex flex-wrap items-center mb-2 gap-2">
            {/* Formatting buttons */}
            <button
              type="button"
              onClick={() => handleTextFormatting("bold")}
              className="p-2 bg-gray-600 hover:bg-gray-700 rounded"
            >
              Bold
            </button>
            <button
              type="button"
              onClick={() => handleTextFormatting("italic")}
              className="p-2 bg-gray-600 hover:bg-gray-700 rounded"
            >
              Italic
            </button>
            <button
              type="button"
              onClick={() => handleTextFormatting("underline")}
              className="p-2 bg-gray-600 hover:bg-gray-700 rounded"
            >
              Underline
            </button>
            <button
              type="button"
              onClick={() => handleTextFormatting("strikeThrough")}
              className="p-2 bg-gray-600 hover:bg-gray-700 rounded"
            >
              Strike
            </button>
          </div>

          <div
            ref={editorRef}
            contentEditable
            onInput={handleEditorChange}
            className="p-4 border border-gray-500 rounded-md min-h-[200px] bg-gray-700"
          >
            {/* Editor content */}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md disabled:opacity-50"
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : "Update Tutorial"}
        </button>
      </form>
    </section>
  );
};

export default EditTutorial;
