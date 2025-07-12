import { useState, useEffect } from "react";
import { useAuth } from "../Authprovider";
import { addData as addDog } from "../../auth";
import { useNavigate } from "react-router-dom";
import { cloudinary as addImage } from "../../auth";
import Pills from "./Pills";

const AddForm = () => {
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

  const throwError = (mssg) => {
    setMssg(mssg)
    window.scrollTo({ top: 0, behavior: "smooth" });

  }

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
    console.log(images);
    

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
  console.log(data);
  
  return data;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (loading) return;

  if (tags.length === 0) {
    throwError("Please add at least one tag.");
    return;
  }

  try {
    setLoading(true);
    let uploadedImages = [];

    try {
      const uploadPromises = images.map(({ file }) => uploadToCloudinary(file));
      uploadedImages = await Promise.all(uploadPromises);

      const imageData = uploadedImages.map(res => ({
        url: res.secure_url,
        public_id: res.public_id,
      }));

      setImages(imageData); // optional — only needed if UI needs preview
    } catch (uploadError) {
      console.error("Image upload error:", uploadError);
      throwError("Image upload failed. Please check your internet and try again.");
      setLoading(false);
      return;
    }

    // 👇 Submit the actual uploaded image data
    const newDog = {
      ...form,
      tags,
      registries,
      images: uploadedImages.map(res => ({
        url: res.secure_url,
        public_id: res.public_id,
      })),
    };

    await addDog(newDog);

    setMssg(`Successfully added ${form.name}`);

    // Clean up
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
    throwError(message);
    setLoading(false);
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
     

         {[
        { id: "serial_no", label: "Serial No", required: true },
        { id: "name", label: "Name", required: true },
        { id: "pedigree", label: "Pedigree" },
        { id: "age", label: "Age" },
        { id: "color", label: "Color" },
        { id: "height", label: "Height" },
        { id: "gender", label: "Gender" },
        { id: "headSize", label: "Head Size" },
        { id: "class", label: "Class" },
      ].map(({ id, label, required }) => (
        <div key={id}>
          <label htmlFor={id}>{label}</label>
          <input
            id={id}
            name={id}
            type="text"
            value={form[id]}
            onChange={handleChange}
            required={required}
            className="w-full p-2 border rounded"
          />
        </div>
      ))}

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
              className="max-w-[200px] max-h-[200px] overflow-hidden relative inline-block mr-2 mt-2"
            >
              <img
                src={image.url}
                alt={`preview-${index}`}
                className=" object-contain mb-5 overflow-hidden "
              />
              <div className="bg-white hover:bg-red-500 absolute left-[80%] mt-1 mr-2 top-0 rounded-full">
                <button
                  type="button"
                  className="px-2 text-black"
                  onClick={() => handleRemove(image.url)}
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
          className="flex items-center justify-center px-4 py-2 mt-10 text-white bg-blue-600 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </section>
  );
};

export default AddForm;