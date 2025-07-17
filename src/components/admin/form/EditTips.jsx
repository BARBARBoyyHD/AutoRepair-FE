import React, { useState, useRef, useEffect } from "react";
import { BASE_URL } from "../../../config/BaseUrl";
import SuccessTips from "../alert/SuccessTips";
import { useParams, useNavigate } from "react-router-dom"; // <--- untuk ambil Tips_Id dari URL
import LoadingSpinner from "../loading/LoadingSpinner";

const EditTips = () => {
  const { Tips_Id } = useParams(); // Ambil ID dari URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    Thumbnail: "",
    Image: "",
    oldThumbnail: "", // <--- TAMBAH ini
    oldImage: "", // <--- TAMBAH ini
    category: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const editorRef = useRef(null); // Ref buat contenteditable div

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      if (name === "Thumbnail") {
        setThumbnailPreview(URL.createObjectURL(file)); // <-- ini betul, preview file baru
      } else if (name === "Image") {
        setImagePreview(URL.createObjectURL(file));
      }
      setFormData((prev) => ({ ...prev, [name]: file }));
    }
  };

  const handleEditorChange = () => {
    if (editorRef.current) {
      setFormData((prev) => ({
        ...prev,
        Description: editorRef.current.innerHTML,
      }));
    }
  };

  const handleTextFormatting = (command) => {
    if (editorRef.current) {
      document.execCommand(command);
      handleEditorChange();
    }
  };

  const getSingleTips = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/v2/single/tips/${Tips_Id}`);
      const result = await response.json();
      console.log(result.data);
      if (response.ok) {
        setFormData({
          Title: result.data.Title || "",
          Description: result.data.Description || "",
          Thumbnail: null,
          Image: null,
          oldThumbnail: result.data.Thumbnail || "",
          oldImage: result.data.Image || "",
          category: result.data.category || "",
        });
        setThumbnailPreview(result.data.Thumbnail || "");
        setImagePreview(result.data.Image || "");

        if (editorRef.current) {
          editorRef.current.innerHTML = result.data.Description || "";
        }
      } else {
        setError(result.message || "Failed to fetch tip details.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching tip details.");
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
    formDataToSend.append("category", formData.category);

    // VALIDASI, kalau user gak upload file baru => kita tetap kirim file lama
    if (formData.Thumbnail) {
      formDataToSend.append("Thumbnail", formData.Thumbnail);
    } else {
      // Kirim file lama (ambil URL lama dari database)
      const response = await fetch(formData.oldThumbnail);
      const blob = await response.blob();
      formDataToSend.append(
        "Thumbnail",
        new File([blob], "thumbnail.jpg", { type: blob.type })
      );
    }

    if (formData.Image) {
      formDataToSend.append("Image", formData.Image);
    } else {
      const response = await fetch(formData.oldImage);
      const blob = await response.blob();
      formDataToSend.append(
        "Image",
        new File([blob], "image.jpg", { type: blob.type })
      );
    }

    try {
      const response = await fetch(
        `${BASE_URL}/api/v2/update/tips/${Tips_Id}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      const result = await response.json();
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/admin/tips/pages");
        }, 1500);
      } else {
        alert(result.message || "Failed to update tip");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while updating the tip.");
    }
  };

  useEffect(() => {
    getSingleTips();
  }, [Tips_Id]);

  if (loading) {
    return (
      <div className="text-center py-10 text-white">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="p-6 text-white rounded-lg">
      <h1 className="text-2xl mb-6">Edit Tips</h1>
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
          {thumbnailPreview ? (
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              className="mt-2 max-h-48 object-contain border border-gray-600 rounded"
            />
          ) : (
            formData.oldThumbnail && (
              <img
                src={`${BASE_URL}/${formData.oldThumbnail}`}
                alt="Old Thumbnail"
                className="mt-2 max-h-48 object-contain border border-gray-600 rounded"
              />
            )
          )}
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
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Image Preview"
              className="mt-2 max-h-48 object-contain border border-gray-600 rounded"
            />
          ) : (
            formData.oldImage && (
              <img
                src={`${BASE_URL}/${formData.oldImage}`}
                alt="Old Image"
                className="mt-2 max-h-48 object-contain border border-gray-600 rounded"
              />
            )
          )}
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

          <div className="flex space-x-2 mb-2">
            <button
              type="button"
              onClick={() => handleTextFormatting("bold")}
              className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded"
            >
              Bold
            </button>
            <button
              type="button"
              onClick={() => handleTextFormatting("italic")}
              className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded"
            >
              Italic
            </button>
            <button
              type="button"
              onClick={() => handleTextFormatting("underline")}
              className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded"
            >
              Underline
            </button>
          </div>

          <div
            id="Description"
            ref={editorRef}
            contentEditable
            className="min-h-[150px] w-full p-3 bg-gray-800 text-white rounded-md border border-gray-700"
            onInput={handleEditorChange}
          ></div>
        </div>

        <button
          type="submit"
          className="w-full h-12 bg-sky-700 hover:bg-sky-600 text-white font-bold py-2 px-6 rounded-lg mt-4"
        >
          {loading ? <LoadingSpinner /> : " Update Tip"}
        </button>
      </form>
    </section>
  );
};

export default EditTips;
