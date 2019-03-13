import axios from "axios";

const api = process.env.API_ROOT_URL;

const signUp = async (signUpDetails) => {
  const error = 'error';

  try {
    const { data: { data: { message } } } = await axios.post(`${api}/users`, signUpDetails);
    return ({ status: 'success', message });
  } catch ({ response: { status } }) {
    switch (status) {
      case 409:
        return ({ error, message: 'User with this email already exist' });
      case 422:
        return ({ error, message: 'Username is invalid' });
      case 500:
      default:
        return ({ error, message: 'Internal server error occured'});
    }
  }
};

export default signUp;
