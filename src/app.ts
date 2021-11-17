import * as dotenv from 'dotenv';
import Debug from 'debug';
import { createServer } from './server';
const debug = Debug('app:run');
dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);

const app = createServer();

app.listen(PORT, () => {
  debug(`Listening on port  http://localhost:${PORT}`);
});

export { app };
