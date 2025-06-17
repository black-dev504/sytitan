import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // your production backend
  withCredentials: true,
});
export const contact = async (credentials) => {
  return await api.post("/contact", credentials);
};

export const getDogs = async (field) => {
  return await api.get(`/lobby/${field}`);
};

export const addData = async (dogData) => {
  return await api.post("/admin/dashboard", dogData);
};

export const getAdmin = async () => {
  return await api.get("/admin/dashboard");
};

export const adminLogin = async (credentials) => {
  return await api.post("/admin/dashboard/login", credentials);
};

export const cloudinary = async (formData) => {
  return await api.post("/cloudinarysave", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const profile = async (serial_no) => {
  return await api.get(`/profile/${serial_no}`);
};

export const dogs = async (id, limit) => {
  return await api.get(`/dogs/${id}/${limit}`);
};
