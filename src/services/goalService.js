import axios from "axios";

const API_URL = "https://goal-tracker-api.onrender.com/api/v1";

export const getGoals = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/goals`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGoalById = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/goals/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createGoal = async (formData, token) => {
  try {
    const response = await axios.post(`${API_URL}/goals`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
