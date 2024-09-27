import axios from 'axios';

export const signup = async (data) => {
  try {
    console.log(data)
    const res = await axios.post('http://localhost:5000/auth/users/signup',  data  );
    return res.data;
    
  } catch (error) {
    console.log("error in signup",error)
    
  }
};

export const login = async (email, password) => {
  const response = await axios.post('http://localhost:5000/auth/users/login', { email, password });
  return response.data;
};
