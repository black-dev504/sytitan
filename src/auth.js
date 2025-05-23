import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true // 👈 include cookies with requests
});

export const contact = async (credentials) => {
  return await api.post('/contact', credentials);
};

export const studs = async (field) => {
  return await api.get(`/dogs/${field}`, dogdata);
};

export const admin = async (credentials) => {
  return await api.get('/admin/dashboard', credentials)
}

export const adminLogin = async (credentials) => {
  return await api.get('/login', credentials)
}
 