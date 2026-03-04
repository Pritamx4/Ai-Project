import axios from 'axios';

// Base URL for API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth Services
export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

// User Profile Services
export const profileService = {
  updateProfile: async (profileData) => {
    const response = await api.put('/profile', profileData);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  },
};

// GitHub Services
export const githubService = {
  fetchRepos: async (username) => {
    const response = await api.get(`/github/repos/${username}`);
    return response.data;
  },

  connectGithub: async (githubUsername) => {
    const response = await api.post('/github/connect', { githubUsername });
    return response.data;
  },
};

// AI Resume Services
export const resumeService = {
  generateResume: async (userData) => {
    const response = await api.post('/resume/generate', userData);
    return response.data;
  },

  getResume: async () => {
    const response = await api.get('/resume');
    return response.data;
  },

  updateResume: async (resumeData) => {
    const response = await api.put('/resume', resumeData);
    return response.data;
  },
};

// Portfolio Services
export const portfolioService = {
  generatePortfolio: async () => {
    const response = await api.post('/portfolio/generate');
    return response.data;
  },

  getPortfolio: async (username) => {
    const response = await api.get(`/portfolio/${username}`);
    return response.data;
  },
};

export default api;
