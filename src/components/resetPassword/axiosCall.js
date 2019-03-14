import axios from '../../utils/axiosConfig';

const resetPassword = async (password, token) => {
  try {
    const { data: { data: { email } } } = await axios.patch(`${process.env.API_ROOT_URL}/users/resetPassword/${token}`, { password });

    return email
  } catch ({ response: { status } }) {
    switch (status) {
      case 401:
      case 404:
        return 'Could not verify your credentials, please re-initiate password change.';

      case 500:
      case 502:
        return  'Server error.';

      default:
        return 'Unknown error.';
    }
  }
};

export default resetPassword;
