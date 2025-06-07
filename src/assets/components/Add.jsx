import { useState, useEffect } from "react";
import { useAuth } from "../Authprovider";
import { addData as addDog } from "../../auth";
import { useNavigate } from "react-router-dom";
import { cloudinary as addImage } from "../../auth";
import Pills from "./Pills";
import axios from "axios";

// const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;

const Add = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mssg, setMssg] = useState(`Welcome ${user?.username || ""}`);
  const [tags, setTags] = useState([]);
  const [registries, setRegistries] = useState([]);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [imgError, setImgError] = useState("");
  const [loading, setLoading] = useState(false);

  const initialForm = {
    serial_no: "",
    name: "",
    age: "",
    color: "",
    tags: [],
    pedigree: "",
    height: "",
    gender: "",
    status: "",
    headSize: "",
    desc: "",
    dogClass: "",
    registries: [],
    images: [],
  };

  const [form, setForm] = useState(initialForm);

  const addPill = (event, arr, setArr) => {
    if (
      (event.key === " " || event.key === "Enter") &&
      event.target.value.trim()
    ) {
      event.preventDefault(); // prevent form submit on Enter
      const entry = event.target.value.trim().toUpperCase();
      event.target.value = "";
      if (!arr.includes(entry)) {
        setArr((prev) => [entry, ...prev]);
      }
    }
  };

  const removePill = (pillToRemove, setArr) => {
    setArr((prev) => prev.filter((pill) => pill !== pillToRemove));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Only uppercase some fields, example: name, pedigree, color, dogClass
    const upperCaseFields = [
      "serial_no",
      "name",
      "pedigree",
      "color",
      "dogClass",
      "gender",
    ];
    setForm((prev) => ({
      ...prev,
      [name]: upperCaseFields.includes(name) ? value.toUpperCase() : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (previewImages.length + files.length > 3) {
      setImgError("Maximum of three pictures allowed");
      return;
    }

    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newImageUrls]);
    setImages((prev) => [...prev, ...files]);
    setImgError("");
  };

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      tags,
      registries,
    }));
  }, [tags, registries]);

  const handleRemove = (image) => {
    setPreviewImages(previewImages.filter((img) => image !== img));
    setImages(images.filter((img, i) => URL.createObjectURL(img) !== image));
    setImgError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (tags.length === 0) {
      setMssg("Please add at least one tag.");
      return;
    }
    try {
      setLoading(true);
      // Upload images
      const uploadPromises = images.map(async (image) => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "sytitan-preset");

        const response = await addImage(data);

        return response.data.secure_url;
      });

      const uploadedImageUrls = await Promise.all(uploadPromises);

      const newDog = {
        ...form,
        images: uploadedImageUrls,
      };

      const response = await addDog(newDog);

      setMssg(`Successfully added ${form.name}`);
      // Reset form and states
      setLoading(false);
      setForm(initialForm);
      setTags([]);
      setRegistries([]);
      setImages([]);
      setPreviewImages([]);
      setImgError("");
      console.log("added");

      navigate("/admin/dashboard");
    } catch (err) {
      const message = err?.response?.data?.error || "Something went wrong";
      setMssg(message);
      setLoading(false);
      console.error(message);
    }
  };

  if (!user) {
    return (
      <h1 className="text-5xl font-black">Please login to access this page</h1>
    );
  }

  return (
    <section className="px-5 pt-20 lg:px-35 ">
      <h1 className="text-5xl font-black">{mssg}</h1>
      <div className="grid grid-cols-2 border border-[#355DD880] border-opacity-50 rounded-lg p-1 my-5 mx-auto">
        <button className="w-full py-2 bg-white rounded-lg cursor-pointer border-1">
          Add New Dog Info
        </button>
        <button className="w-full py-2 bg-white rounded-lg cursor-pointer">
          Edit existing Info
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="p-4 mx-auto mt-10 space-y-4 bg-white rounded shadow max-w-7/10"
      >
        <h2 className="mb-4 text-2xl font-bold">Add Dog Info</h2>

        <input
          name="serial_no"
          type="text"
          value={form.serial_no}
          placeholder="serial no"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="name"
          type="text"
          value={form.name}
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="pedigree"
          type="text"
          value={form.pedigree}
          placeholder="Pedigree"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="age"
          type="text"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="color"
          type="text"
          placeholder="Color"
          value={form.color}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="height"
          type="text"
          placeholder="Height"
          value={form.height}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="gender"
          type="text"
          placeholder="Gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="headSize"
          type="text"
          placeholder="Head Size"
          value={form.headSize}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="dogClass"
          type="text"
          placeholder="Class"
          value={form.dogClass}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="tags"
          type="text"
          placeholder="Tags"
          onKeyDown={(e) => addPill(e, tags, setTags)}
          className="w-full p-2 border rounded"
        />
        <div className="inline-block mt-3 tags">
          {tags.length > 0 &&
            tags.map((tag, index) => (
              <Pills
                value={tag}
                key={index}
                onRemove={() => removePill(tag, setTags)}
              />
            ))}
        </div>
        <input
          name="registries"
          type="text"
          placeholder="Registries"
          onKeyDown={(e) => addPill(e, registries, setRegistries)}
          className="block w-full p-2 border rounded"
        />

        <div className="inline-block mt-3 registries">
          {registries.length > 0 &&
            registries.map((registry, index) => (
              <Pills
                value={registry}
                key={index}
                onRemove={() => removePill(registry, setRegistries)}
              />
            ))}
        </div>
        <textarea
          rows={4}
          name="desc"
          type="textfield"
          placeholder="description"
          value={form.desc}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <div>
          <label>
            <input
              type="radio"
              name="status"
              value="FOR SALE"
              onChange={handleChange}
              checked={form.status === "FOR SALE"}
              className="ml-3 mr-1"
            />
            For Sale
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="NOT FOR SALE"
              onChange={handleChange}
              checked={form.status === "NOT FOR SALE"}
              className="ml-5 mr-1"
            />
            Not for Sale
          </label>
        </div>
        <label className="block mt-2 font-medium">Upload up to 3 Images:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
          required
        />

        <div className="block">
          {previewImages.map((image, index) => (
            <div
              key={index}
              className="max-w-[200px] max-h-[200px] relative inline-block mr-2 mt-2"
            >
              <img
                src={image}
                alt={`preview-${index}`}
                className="max-w-[200px] object-cover max-h-[200px]"
              />
              <div className="bg-white hover:bg-red-500 absolute left-[80%] mt-1 mr-2 top-0 rounded-full">
                <button
                  type="button"
                  className="px-2 text-black"
                  onClick={() => handleRemove(image)}
                >
                  X
                </button>
              </div>
            </div>
          ))}
          <h1 className="text-xl text-red-500">{imgError}</h1>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </section>
  );
};

export default Add;
