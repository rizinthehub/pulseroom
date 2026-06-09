import 'dotenv/config';
import { createServer } from './server';
import { env } from './config/env';

const { httpServer } = createServer();

httpServer.listen(env.PORT, () => {
  console.log(`PulseRoom server listening on port ${env.PORT}`);
});