import resetPassword from '../../../components/resetPassword/axiosCall';
import axios from '../../../utils/axiosConfig';

jest.mock('../../../utils/axiosConfig');

test('Should return email for successful call', async () => {
  const response = {
    data: {
      data: {
        email: 'omo@testmail.com'
      }
    }
  };

  axios.patch.mockResolvedValue(response);

  const email = await resetPassword('password');

  expect(email).toBe(response.data.data.email);
});

test('Should return correct errors for erroneous calls', async () => {
  let response = { response: { status: 401 }};

  axios.patch.mockRejectedValue(response);

  let error = await resetPassword('password');

  expect(error).toBe('Could not verify your credentials, please re-initiate password change.');

  response = { response: { status: 500 }};

  axios.patch.mockRejectedValue(response);

  error = await resetPassword('password');

  expect(error).toBe('Server error.');

  response = { response: { status: 422 }};

  axios.patch.mockRejectedValue(response);

  error = await resetPassword('password');

  expect(error).toBe('Unknown error.');
});
