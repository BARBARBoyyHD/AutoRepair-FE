import React, { useState, useRef } from "react";
import { BASE_URL } from "../../../config/BaseUrl";
import SuccessTips from "../alert/SuccessTips";
import LoadingSpinner from "../loading/LoadingSpinner";
const AddNewTips = () => {
  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    Thumbnail: null,
    Image: null,
    category: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null); // Ref for the contenteditable div

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("Title", formData.Title);
    formDataToSend.append("Description", formData.Description);
    formDataToSend.append("Thumbnail", formData.Thumbnail);
    formDataToSend.append("Image", formData.Image);
    formDataToSend.append("category", formData.category);

    try {
      const response = await fetch(`${BASE_URL}/api/v2/post/tips`, {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      if (response.ok) {
        setSuccess(true);
      } else {
        alert(result.message || "Error adding tip");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className=" p-6 text-white rounded-lg">
      <h1 className="text-2xl mb-6">Add New Tips</h1>
      {success && (
        <div className="fixed inset-0 z-50">
          <SuccessTips success={success} onClose={() => setSuccess(false)} />
        </div>
      )}

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
          <label className="block text-lg mb-2" htmlFor="Thumbnail">
            Thumbnail Image
          </label>
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
          <label className="block text-lg mb-2" htmlFor="Image">
            Main Image
          </label>
          <input
            type="file"
            id="Image"
            name="Image"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-700"
          >
            <option value="">-- Select Category --</option>
            <option value="Berat">Berat</option>
            <option value="Ringan">Ringan</option>
          </select>
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
          >
            {/* Rich text content goes here */}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md"
        >
          {loading ? <LoadingSpinner /> : "Add Tip"}
        </button>
      </form>
    </section>
  );
};

export default AddNewTips;
