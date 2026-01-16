import Constants from 'expo-constants';

const ENV = {
  dev: {
    apiUrl: 'http://localhost:8000/api/v1',
  },
  prod: {
    apiUrl: 'https://cab-connect-api.onrender.com/api/v1',
  },
};

const getEnvVars = () => {
  const environment = Constants.expoConfig?.extra?.environment || 'dev';
  return environment === 'prod' ? ENV.prod : ENV.dev;
};

export const API_CONFIG = {
  BASE_URL: getEnvVars().apiUrl,
  TIMEOUT: 30000,
};

export default getEnvVars();
