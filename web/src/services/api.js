import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const collectionPointsService = {
  getAll: async () => {
    const response = await api.get("/collection-points");
    return response.data;
  },

  getOne: async (id) => {
    const response = await api.get(`/collection-points/${id}`);
    return response.data;
  },

  create: async (point) => {
    const response = await api.post("/collection-points", point);
    return response.data;
  },

  update: async (id, point) => {
    const response = await api.put(`/collection-points/${id}`, point);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/collection-points/${id}`);
    return response.data;
  },
};

export default api;
