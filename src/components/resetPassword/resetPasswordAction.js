import axios from '../../utils/axiosConfig';

const resetPassword = async (oldPassword, newPassword) => {
  try {
    const {
      data: {
        data: {
         message
        }
      }
    } = await axios.patch(`${process.env.API_ROOT_URL}/users/resetPassword`, {
      oldPassword, newPassword
    });

    return message
  } catch (error) {
    throw error;
  }
};

export default resetPassword;