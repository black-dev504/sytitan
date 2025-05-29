import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sytitan.vercel.app/',
  withCredentials: true // 👈 include cookies with requests
});

export const contact = async (credentials) => {
  return await api.post('/contact', credentials);
};

export const getDogs = async (field) => {
  return await api.get(`/lobby/${field}`);
};

export const addData = async (dogData) => {
  return await api.post('/admin/dashboard', dogData)
}

export const adminLogin = async (credentials) => {
  return await api.post('/admin/dashboard/login', credentials)
}

export const cloudinary = async (credentials) => {
  return await api.post('/cloudinarysave', credentials)
}

export const profile = async (serial_no) => {
  return await api.get(`/profile/${serial_no}`);
}

export const dogs = async (id,limit) => {
  return await api.get(`/dogs/${id}/${limit}`);
}
