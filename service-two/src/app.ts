import express from 'express';
import { connect } from './database/database';
// import our local router file
import routes from './routes/routes';
// init express app
connect();
const app = express();
// allow express to work with json
app.use(express.json());
// router
app.use(routes);
// export app to import into server.js
export default app;
