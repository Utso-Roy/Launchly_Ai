import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://launchly-server-side.vercel.app",
});
export const axiosSecure = async (endpoint, options = {}) => {
  try {
    const res = await axiosInstance({
      url: endpoint,
      method: options.method || "GET",
      data: options.data || null,
      params: options.params || null,
    });
    return res.data;
  } catch (error) {
    console.error("axiosSecure error:", error?.response || error.message);
    throw error;
  }
};
