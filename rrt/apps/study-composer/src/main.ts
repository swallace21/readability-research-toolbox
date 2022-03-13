/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import * as express from 'express';
import { checkSessionUser } from './app/controllers/user'
import { expSession } from './app/sessions';
import studies from './app/routes/studies';

const app = express();
app.use(expSession)

///////////////////////////////
app.use(checkSessionUser);
app.use(studies);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
