import { useState, useEffect } from "react";
import { useAuth } from "../Authprovider";
import { addData as addDog } from "../../auth";
import { useNavigate } from "react-router-dom";
import { cloudinary as addImage } from "../../auth";
import Pills from "./Pills";

const Add = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mssg, setMssg] = useState(`Welcome ${user?.username || ""}`);
  const [tags, setTags] = useState([]);
  const [registries, setRegistries] = useState([]);
  const [images, setImages] = useState([]); // [{ file, url }]
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
    class: "",
    registries: [],
    images: [],
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    const savedForm = localStorage.getItem("add-dog-form");
    const savedTags = localStorage.getItem("add-dog-tags");
    const savedRegistries = localStorage.getItem("add-dog-registries");

    if (savedForm) setForm(JSON.parse(savedForm));
    if (savedTags) setTags(JSON.parse(savedTags));
    if (savedRegistries) setRegistries(JSON.parse(savedRegistries));
  }, []);

  useEffect(() => {
    const updatedForm = { ...form, tags, registries };
    setForm(updatedForm);
    localStorage.setItem("add-dog-form", JSON.stringify(updatedForm));
  }, [tags, registries]);

  useEffect(() => {
    localStorage.setItem("add-dog-tags", JSON.stringify(tags));
  }, [tags]);

  useEffect(() => {
    localStorage.setItem("add-dog-registries", JSON.stringify(registries));
  }, [registries]);

  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.url));
    };
  }, [images]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const upperCaseFields = [
      "serial_no",
      "name",
      "pedigree",
      "color",
      "class",
      "gender",
    ];
    const updatedForm = {
      ...form,
      [name]: upperCaseFields.includes(name) ? value.toUpperCase() : value,
    };
    setForm(updatedForm);
    localStorage.setItem("add-dog-form", JSON.stringify(updatedForm));
  };

  const addPill = (event, arr, setArr) => {
    if (
      (event.key === " " || event.key === "Enter") &&
      event.target.value.trim()
    ) {
      event.preventDefault();
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (images.length + files.length > 3) {
      setImgError("Maximum of three pictures allowed");
      return;
    }

    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
    setImgError("");
  };

  const handleRemove = (url) => {
    setImages((prev) => prev.filter((img) => img.url !== url));
    setImgError("");
  };

  const uploadToCloudinary = async (file) => {
  const url = import.meta.env.VITE_CLOUDINARY_URL;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "sytitan-preset");

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Cloudinary upload failed");
  }

  const data = await response.json();
  return data.secure_url;
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (tags.length === 0) {
      setMssg("Please add at least one tag.");
      window.scrollTo({ top: 0, behavior: "smooth" });

      return;
    }

    try {
      setLoading(true);
      let uploadedImageUrls = [];

      try {
       const uploadPromises = images.map(({ file }) => uploadToCloudinary(file));
        uploadedImageUrls = await Promise.all(uploadPromises);
        setImages(uploadedImageUrls)
      } catch (uploadError) {
        console.error("Image upload error:", uploadError);
        setMssg("Image upload failed. Please check your internet and try again.");
        window.scrollTo({ top: 0, behavior: "smooth" });
        setLoading(false);
        return;
      }

      const newDog = {
        ...form,
        tags,
        registries,
        images: uploadedImageUrls,
      };

      await addDog(newDog);

      setMssg(`Successfully added ${form.name}`);
      localStorage.removeItem("add-dog-form");
      localStorage.removeItem("add-dog-tags");
      localStorage.removeItem("add-dog-registries");
      setForm(initialForm);
      setTags([]);
      setRegistries([]);
      setImages([]);
      setImgError("");
      setLoading(false);
      navigate("/admin/dashboard");
    } catch (err) {
      const message = err?.response?.data?.error || "Something went wrong";
      setMssg(message);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      console.error("Form submission error:", message);
    }
  };

  if (!user) {
    return <h1 className="text-5xl font-black">Please login to access this page</h1>;
  }

  return (
    <section className="px-5 pt-20 lg:px-35">
      <h1 className="text-5xl font-black">{mssg}</h1>
      <form
        onSubmit={handleSubmit}
        className="p-4 mx-auto mt-10 space-y-4 bg-white rounded shadow max-w-7/10"
      >
        <h2 className="mb-4 text-2xl font-bold">Add Dog Info</h2>

        <div>
          <label htmlFor="serial_no">Serial No</label>
          <input
            id="serial_no"
            name="serial_no"
            type="text"
            value={form.serial_no}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="pedigree">Pedigree</label>
          <input
            id="pedigree"
            name="pedigree"
            type="text"
            value={form.pedigree}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="age">Age</label>
          <input
            id="age"
            name="age"
            type="text"
            value={form.age}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="color">Color</label>
          <input
            id="color"
            name="color"
            type="text"
            value={form.color}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="height">Height</label>
          <input
            id="height"
            name="height"
            type="text"
            value={form.height}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="gender">Gender</label>
          <input
            id="gender"
            name="gender"
            type="text"
            value={form.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="headSize">Head Size</label>
          <input
            id="headSize"
            name="headSize"
            type="text"
            value={form.headSize}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="dogClass">Class</label>
          <input
            id="dogClass"
            name="dogClass"
            type="text"
            value={form.dogClass}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="tags">Tags (Press Enter or Space to add)</label>
          <input
            id="tags"
            name="tags"
            type="text"
            onKeyDown={(e) => addPill(e, tags, setTags)}
            className="w-full p-2 border rounded"
          />
          <div className="inline-block mt-3 tags">
            {tags.map((tag, index) => (
              <Pills
                value={tag}
                key={index}
                onRemove={() => removePill(tag, setTags)}
              />
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="registries">
            Registries (Press Enter or Space to add)
          </label>
          <input
            id="registries"
            name="registries"
            type="text"
            onKeyDown={(e) => addPill(e, registries, setRegistries)}
            className="w-full p-2 border rounded"
          />
          <div className="inline-block mt-3 registries">
            {registries.map((r, index) => (
              <Pills
                value={r}
                key={index}
                onRemove={() => removePill(r, setRegistries)}
              />
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="desc">Description</label>
          <textarea
            id="desc"
            rows={4}
            name="desc"
            value={form.desc}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label>Status</label>
          <div className="mt-1">
            <label htmlFor="for-sale">
              <input
                id="for-sale"
                type="radio"
                name="status"
                value="FOR SALE"
                onChange={handleChange}
                checked={form.status === "FOR SALE"}
                className="ml-3 mr-1"
              />
              For Sale
            </label>
            <label htmlFor="not-for-sale">
              <input
                id="not-for-sale"
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
        </div>

        <div>
          <label htmlFor="images">Upload up to 3 Images</label>
          <input
            id="images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
            required
          />
        </div>

        <div>
          {images.map((image, index) => (
            <div
              key={index}
              className="max-w-[200px] max-h-[200px] relative inline-block mr-2 mt-2"
            >
              <img
                src={image.url}
                alt={`preview-${index}`}
                className=" object-contain overflow-hidden "
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
