import axios from "axios";

import escapeInputs from './escapeInputs';

const api = process.env.API_ROOT_URL;

const signUp = async (signUpDetails) => {
  const error = 'error';
  const escapedSignUpDetails = escapeInputs(signUpDetails);
  
  try {
    const { data: { data: { message } } } = await axios.post(`${api}/users`, escapedSignUpDetails);
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
