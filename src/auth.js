import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
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
  return await api.post('/cloudnary-save', credentials)
}
