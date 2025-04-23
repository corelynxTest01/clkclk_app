import Axios from "axios";
import moment from "moment";
const AsyncStorage =
  require("@react-native-async-storage/async-storage").default;

// Constants
const AUTH_HEADER = "Authorization";
const Api_EndPoint = "https://clkclkdev.corelynx.com/api";

// Create axios instance with custom config
let axiosInstances = Axios.create({ timeout: 10000, headers: {} });
axiosInstances.defaults.headers.common["Content-Type"] = "application/json";

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
      deleteToken("tempClique");
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
  get: (url, config = getHeader()) =>
    axiosInstancepter().get(Api_EndPoint + url, config),
  delete: (url, config = getHeader()) =>
    axiosInstancepter().delete(Api_EndPoint + url, config),
  put: (url, data = {}, config = getHeader()) =>
    axiosInstancepter().put(Api_EndPoint + url, data, config),
  post: (url, data = {}, config = getHeader()) =>
    axiosInstancepter().post(Api_EndPoint + url, data, config),
  patch: (url, data = {}, config = getHeader()) =>
    axiosInstancepter().patch(Api_EndPoint + url, data, config),
};

// Save a token securely
export const isPlatformNotMob = () => {
  return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator?.userAgent
  );
};

export const setToken = async (key, token) => {
  try {
    if (!isPlatformNotMob()) sessionStorage.setItem(key, token);
    else await AsyncStorage.setItem(key, token);
    if (key === "authToken") setAxiosHeader(token);
  } catch (error) {
    console.error("Error storing token:", error);
  }
};

// Get the stored token
export const getToken = async (key) => {
  try {
    let token = null;
    if (!isPlatformNotMob()) token = sessionStorage.getItem(key);
    else token = await AsyncStorage.getItem(key);
    return token;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

const getHeader = async () => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: await getToken("authToken"),
  },
});

// Delete the token (for logout)
export const deleteToken = async (key) => {
  try {
    if (!isPlatformNotMob()) sessionStorage.removeItem(key);
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
      if (!isPlatformNotMob() && navigation)
        navigation.navigate("login"); // This is for mobile Device
      else if (!!navigator) navigator.navigate("login");
    }
    return false;
  } catch (error) {
    console.error("Error in security check:", error.message);
    return false;
  }
};

export function generateYearList() {
  const yearList = [];
  const currentYear = moment().year();
  const endYear = currentYear + 10;
  const startYear = currentYear - 80;
  for (let year = startYear; year <= endYear; year++) {
    yearList.push(year);
  }

  return yearList;
}

export const formatAmount = (amount = 0) =>(+amount).toLocaleString("en-US", { style: "currency", currency: "USD" });