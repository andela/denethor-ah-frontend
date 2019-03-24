import forgotPassword from '../../../components/resetPassword/resetPasswordAction';
import axios from '../../../utils/axiosConfig';

jest.mock('../../../utils/axiosConfig');

test('Should return email for successful call', async () => {
  const response = {
    data: {
      data: {
        message: 'Password updated successfully.'
      }
    }
  };

  axios.patch.mockResolvedValue(response);

  const message = await forgotPassword('password');

  expect(message).toBe(response.data.data.message);
});