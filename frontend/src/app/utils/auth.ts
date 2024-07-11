import axios from "axios";

axios.defaults.withCredentials = true;

export async function login(email: string, password: string) {
  try {
    const response = await axios.post("http://localhost:8443/api/auth/login", {
      email,
      password,
    });
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export async function checkAuth() {
  try {
    const response = await axios.get("http://localhost:8443/api/auth/check");
    return response.data;
  } catch (error) {
    console.error("Error checking authentication:", error);
    return { isAuthenticated: false };
  }
}
