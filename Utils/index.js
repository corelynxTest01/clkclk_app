import Axios from "axios";
const AsyncStorage =
  require("@react-native-async-storage/async-storage").default;

// Constants
const AUTH_HEADER = "Authorization";
const Api_EndPoint = "https://clkclkdev.corelynx.com/api";

// Create axios instance with custom config
let axiosInstances = Axios.create({
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Get user IP and add to headers
fetch("https://api.ipify.org?format=json")
  .then((response) => response.json())
  .then(({ ip }) => (axiosInstances.defaults.headers.common["X-User-IP"] = ip))
  .catch((err) => console.error("Error getting IP:", err));

// Response interceptor
axiosInstances.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response?.status === 401 && response?.data === "Unauthorized") {
      deleteToken("authToken");
    }
    return Promise.reject(error);
  }
);

const setAxiosHeader = (token = null) => {
  const accessToken = token;
  if (!accessToken) return;
  axiosInstances.defaults.headers.common[AUTH_HEADER] = accessToken;
};

const axiosInstancepter = () => axiosInstances;

export const setAuthToken = (token) => {
  if (token) setAxiosHeader(token);
  else delete Axios.defaults.headers.common[AUTH_HEADER];
};

// Helper methods for common HTTP requests
export const axios = {
  get: (url, config = {}) =>
    axiosInstancepter().get(Api_EndPoint + url, config),
  delete: (url, config = {}) =>
    axiosInstancepter().delete(Api_EndPoint + url, config),
  put: (url, data = {}, config = {}) =>
    axiosInstancepter().put(Api_EndPoint + url, data, config),
  post: (url, data = {}, config = {}) =>
    axiosInstancepter().post(Api_EndPoint + url, data, config),
  patch: (url, data = {}, config = {}) =>
    axiosInstancepter().patch(Api_EndPoint + url, data, config),
};

// Save a token securely
export const isPlatformMobile = () => {
  return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator?.userAgent
  );
};

export const setToken = async (key, token) => {
  try {
    if (!isPlatformMobile()) sessionStorage.setItem(key, token);
    else await AsyncStorage.setItem(key, token);
    setAxiosHeader(token);
  } catch (error) {
    console.error("Error storing token:", error);
  }
};

// Get the stored token
export const getToken = async (key) => {
  try {
    let token = null;
    if (!isPlatformMobile()) token = sessionStorage.getItem(key);
    else token = await AsyncStorage.getItem(key);
    return token;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

// Delete the token (for logout)
export const deleteToken = async (key) => {
  try {
    if (!isPlatformMobile()) sessionStorage.removeItem(key);
    else AsyncStorage.removeItem(key);
    delete Axios.defaults.headers.common[AUTH_HEADER];
  } catch (error) {
    console.error("Error deleting token:", error);
  }
};

export const securityCheck = async (navigation) => {
  try {
    const token = await getToken("authToken");
    if (!token) {
      console.log("Token not found, navigating to Login");
      if (isPlatformMobile() && navigation) navigation.navigate("Login");
      else if (!!navigator) navigator.navigate("login");
    }
    return false;
  } catch (error) {
    console.error("Error in security check:", error.message);
    return false;
  }
};
