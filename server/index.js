import path from 'path';
import dotenv from 'dotenv';
import '@babel/polyfill';
import express from 'express';
import chalk from 'chalk';
import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'debug',
  format: format.simple(),
  transports: [new transports.Console()]
});

dotenv.config();
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const { PORT: port = 8080 } = process.env;

app.use(express.static(publicPath));

// app.get('/api/users/:id/verify', async function loginWebhookHandler(req, res) {
//   try {
//   const link = `${process.env.API_ROOT_URL}/users/${req.params.id}/verify`;
//   const { data: { data: { user: { token } } } } = await axios.patch(link);
//   return res.redirect(`/redirect/${token}`);
//   } catch(error) {
//     logger.error(error);
//   }
// });

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, function serverListner() {
  logger.debug(`Server running on port ${chalk.blue(port)}`);
});
