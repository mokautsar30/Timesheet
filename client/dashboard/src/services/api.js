import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

export const loginUser = (userData) => api.post('/login', userData)
export const getActivities = () => api.get('/activities');
export const getProjects = () => api.get('/project');
export const addProject = (projects) => api.post('/project',projects)
export const addActivities = (activities) => api.post('/activities',activities )
export const updateActivity = (id, dataUpdate) => api.put(`/activities/${id}`, dataUpdate)
export const deleteActivity = (id) => api.delete(`/activities/${id}`);
