import axios from "axios";

//const API_URL = "http://localhost:5000/api/picture-spots";
const API_URL = `${
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
}/api/picture-spots`;

export const getPictureSpots = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getPictureSpotById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createPictureSpot = async (formData) => {
  const response = await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
