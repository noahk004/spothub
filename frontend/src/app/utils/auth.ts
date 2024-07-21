import axios from "axios";

axios.defaults.withCredentials = true;

export async function login(email: string, password: string) {
  try {
    const response = await axios.post("https://localhost:8443/api/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log("Error logging in:", error);
    throw error;
  }
}

export async function checkAuth() {
  try {
    const response = await axios.get("https://localhost:8443/api/auth/check");
    return response.data;
  } catch (error) {
    console.log("Something went wrong while checking authentication:", error);
    throw error;
  }
}

export async function register(
  username: string,
  fName: string,
  lName: string,
  email: string,
  password: string
) {
  try {
    const response = await axios.post(
      "https://localhost:8443/api/auth/register",
      {
        username,
        fName,
        lName,
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error logging in:", error);
    throw error;
  }
}
