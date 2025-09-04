import { Router } from 'express';

const indexRouter = Router();

indexRouter.get('/', (req, res) => {
  res.status(200).send('homepage');
});

export default indexRouter;