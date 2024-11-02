import axios from 'axios';
import { apiEndpoints } from './config';

const getApiBaseUrl = async () => {
  try {
    const response = await axios.get('https://ipapi.co/json/');
    const { country_code } = response.data;

    const euCountryCodes = [
      'AT', 'BE', 'BG', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FR', 'GR',
      'HR', 'HU', 'IE', 'IT', 'LT', 'LU', 'LV', 'MT', 'NL', 'PL', 'PT', 'RO',
      'SE', 'SI', 'SK'
    ];
    return euCountryCodes.includes(country_code) ? apiEndpoints.EU : apiEndpoints.Global;
  } catch (error) {
    console.error('Error detecting location, defaulting to Global API:', error);
    return apiEndpoints.Global;
  }
};

const createAxiosInstance = async () => {
  const baseURL = await getApiBaseUrl();
  
  const instance = axios.create({
    baseURL,
  });

  instance.interceptors.request.use(
    async (config) => {
      const apiKey = process.env.REACT_APP_JOTFORM_API_KEY;
      if (apiKey) {
        config.params = {
          ...config.params,
          apiKey,
        };
      } else {
        console.warn("API key is missing");
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
  );

  return instance;
};

// Usage example
const api = await createAxiosInstance();
export default api;
