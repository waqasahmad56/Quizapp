import axios from 'axios';

const API_URL = 'http://localhost:5000/auth/users';


export const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};


export const createUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users`, userData);
  return response.data;
};


export const updateUser = async (userData) => {
  const response = await axios.put(`${API_URL}/users/${userData._id}`, userData);
  return response.data;
};


export const deleteUser = async (userId) => {
  await axios.delete(`${API_URL}/users/${userId}`);
};
