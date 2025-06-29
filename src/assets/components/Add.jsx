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
    head_size: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (tags.length === 0) {
      setMssg("Please add at least one tag.");
      return;
    }

    try {
      setLoading(true);
      let uploadedImageUrls = [];

      try {
        const uploadPromises = images.map(async ({ file }) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "sytitan-preset");
          const response = await addImage(data);
          return response.data.secure_url;
        });

        uploadedImageUrls = await Promise.all(uploadPromises);
      } catch (uploadError) {
        console.error("Image upload error:", uploadError);
        setMssg("Image upload failed. Please check your internet and try again.");
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
      console.error("Form submission error:", message);
    }
  };

  if (!user) {
    return <h1 className="text-5xl font-black">Please login to access this page</h1>;
  }

  return (
    <section className="px-5 pt-20 lg:px-35">
      <h1 className="text-5xl font-black">{mssg}</h1>
      {/* ... Your full JSX form here stays mostly the same, just change field names like class/head_size */}
    </section>
  );
};

export default Add;
