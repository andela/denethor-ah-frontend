import axios from '../../utils/axiosConfig';
import { escapeInputs } from '../../utils/escapeInputs';

const { API_ROOT_URL } = process.env;

const forgotPasswordVerification = async (resetDetails) => {
  const error = 'error';
  const escapedResetDetails = escapeInputs(resetDetails);

  try {
    const { data: { data: { message } } } = await axios.post(`${API_ROOT_URL}/users/forgotPassword`, escapedResetDetails);
    return ({ status: 'success', message });
  } catch ({ response: { status } }) {
    switch (status) {
      case 404:
        return ({ error, message: 'User not found, Provide correct email address'});

      default:
        return ({ error, message: 'Internal server error occured' });
    }
  }
};

export default forgotPasswordVerification;