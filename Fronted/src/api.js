import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3002/api";
const token = localStorage.getItem('token')

// Function to call the registration API
export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${apiUrl}/signup`, formData, {
      headers: {
        
        "Content-Type": "multipart/form-data", 
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, loginData);
    const { id, token } = response.data;
    localStorage.setItem('userId', id);  
    localStorage.setItem('token', token);  
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const getregisterbyid = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/getuser/${id}`,{
      headers:{
        Authorization : `${token}`,
        "Content-Type" : 'application/json'
      }
    });  
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user data");
  }
};

export const updateUser = async (userId,userData) => {
  try {
    const response = await axios.put(`${apiUrl}/update/${userId}`, userData ,{
      headers:{
        Authorization : `${token}`,
        "Content-Type" : 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update user profile", error);
    throw error; 
  }
};
export const changePassword = async (userId, passwordData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.put(`${apiUrl}/user/change-password/${userId}`, passwordData, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data; // Success message or status
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to change password");
  }
};  

export const exportUsers = async () => {
  try {
      const response = await axios.get(`${apiUrl}/users/export`, {
          responseType: 'blob', // Important for handling CSV response
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token if you're using JWT
          },
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
  } catch (error) {
      console.error('Error exporting users:', error);
  }
};

// Function to import users from CSV
export const importUsers = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${apiUrl}/import`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // Authorization: `Bearer ${localStorage.getItem('token')}`, 
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error importing users:', error);
    throw error;
  }
};


//==============================adduser=========================================
export const getuserdatafinal = async () => {
  try {
    const response = await axios.get(`${apiUrl}/getuserdatafinal`,{
      headers:{
        Authorization : `${token}`,
        "Content-Type" : 'application/json'
      }
    }); 
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user data");
  }
};

export const fetchUser = async () => {
  try {
    const response = await axios.get(`${apiUrl}/auth`,{
      headers:{
        Authorization : `${token}`,
        "Content-Type" : 'application/json'
      }
    }); 
    return response.data; 
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user data");
  }
};

export const addUser = async (user) => {
  try {
    const response = await axios.post(`${apiUrl}/createusers`, user,{
      headers:{
        Authorization : `${token}`,
        "Content-Type" : 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add user");
  }
};

export const getPeginatedData = async (pageNo, search, userId) => {
  console.log(userId ,"getPeginatedData")
  const response = await axios.get(`${apiUrl}/pagination?page=${pageNo}&search=${search}&userId=${userId}`,{
    headers:{
      Authorization : `${token}`,
      "Content-Type" : 'application/json'
    }
  }); 
  return response; 
};

