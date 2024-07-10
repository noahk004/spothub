import axios from "axios";

axios.defaults.withCredentials = true;

export const login = async (email: String, password: String) => {
  try {
    const response = await axios.post("https://localhost:8443/api/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
