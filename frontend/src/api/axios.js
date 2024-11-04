import axios from 'axios';
import { apiEndpoints, apiDatabase } from './config';

const getApiBaseUrl = async (isDatabaseCall = false) => {
  if (isDatabaseCall) {
    return apiDatabase; 
  }

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

const createAxiosInstance = async (isDatabaseCall = false) => {
  const baseURL = await getApiBaseUrl(isDatabaseCall);
  
  const instance = axios.create({
    baseURL,
  });

  instance.interceptors.request.use(
    (config) => {
      const apiKey = process.env.REACT_APP_JOTFORM_API_KEY;
      if (apiKey && !isDatabaseCall) { // Check if not a database call
        config.params = {
          ...config.params,
          apiKey,
        };
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

const jotformApi = await createAxiosInstance(); // For Jotform API
const databaseApi = await createAxiosInstance(true); // For database calls

export { jotformApi, databaseApi };
