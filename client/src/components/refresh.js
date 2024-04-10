import Axios from 'axios';
import Cookie from 'js-cookie'
const RefreshToken = async (refreshToken) => {
  try {
    // Send a POST request to the /refresh-token endpoint with the refresh token
    const response = await Axios.post('https://backend-omega-orpin.vercel.app/refresh-token', { refreshToken });

    // Extract the new access token from the response
    const newAccessToken = response.data.accessToken;

    // Store the new access token in browser storage (e.g., localStorage or sessionStorage)
    Cookie.set('Jalebi', newAccessToken);

    return newAccessToken;
  } catch (error) {
    // Handle any errors, such as network issues or invalid refresh token
    console.error('Error refreshing token:', error);
    throw error;
  }
};

export default RefreshToken;
