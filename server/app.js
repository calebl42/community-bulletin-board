import express from 'express';
const app = express();
import 'dotenv/config';
import indexRouter from './routes/indexRouter.js';
import newRouter from './routes/newRouter.js';

const port = process.env.PORT || 8080;
const hostname = process.env.HOSTNAME || 'localhost'; 

app.use('/', indexRouter);
app.use('/new', newRouter);

app.listen(port, hostname, () => {
  console.log(`Express server running at http://${hostname}:${port}`);
});
