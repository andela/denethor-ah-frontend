import resetPasswordVerification from '../../../components/resetPasswordVerification/axiosCall';
import axios from '../../../utils/axiosConfig';

jest.mock('../../../utils/axiosConfig');
const email = 'foobar@bar.com';
const successMsg = `A confirmation email has been sent to ${email}.
  Click on the confirmation button to verify the account`

test('Should return 200 for successful call', async () => {
  const response = { data: { data: { message: successMsg } } };

  axios.post.mockResolvedValue(response);

  const { message } = await resetPasswordVerification({ email });

  expect(message).toBe(successMsg);
});

test('Should return 404 for erroneous calls', async () => {
  const response = { response: { status: 404 } };

  axios.post.mockRejectedValue(response);

  const { message } = await resetPasswordVerification({ email });

  expect(message).toBe('User not found, Provide correct email address');
});

test('Should return 500 for erroneous calls', async () => {
  const response = { response: { status: 500 } };

  axios.post.mockRejectedValue(response);

  const { message } = await resetPasswordVerification({ email });

  expect(message).toBe('Internal server error occured');
});
