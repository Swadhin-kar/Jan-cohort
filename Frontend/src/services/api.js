import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const generateJobDescription = async (data) => {
  try {
    const response = await api.post("/generate", data);
    return response.data;
  } catch (error) {
    console.error("Error generating job description:", error);
    throw error;
  }
};

export const getDrafts = async () => {
  try {
    const response = await api.get("/drafts");
    return response.data;
  } catch (error) {
    console.error("Error fetching drafts:", error);
    throw error;
  }
};

export const getDraftById = async (id) => {
  try {
    const response = await api.get(`/drafts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching draft:", error);
    throw error;
  }
};

export const deleteDraft = async (id) => {
  try {
    const response = await api.delete(`/drafts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting draft:", error);
    throw error;
  }
};