import axios from 'axios';

const env = require('../loadEnvironment.js');
const authRootUrl = env.AUTH_URL + '/auth';

export const generateJWT = async (userData) => {
  try {
    return await axios.get(authRootUrl + '/generate', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), {
        response: { status: 408 },
        message: 'Network Error',
      });
    }
    throw err;
  }
};

export const authorize = async (token) => {
  try {
    return await axios.get(authRootUrl + '/authorize', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    });
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      throw Object.assign(new Error(err.code), {
        response: { status: 408 },
        message: 'Network Error',
      });
    }
    throw err;
  }
};
