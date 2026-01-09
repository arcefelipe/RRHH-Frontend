import axios from 'axios';

// Cliente para el backend .NET
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5094';

export const backendApi = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor para manejar errores
backendApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log completo del error para debugging
    console.error('API Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      code: error.code,
    });
    return Promise.reject(error);
  }
);

export default backendApi;
