import cors from 'cors';
import express, { Application, Request, Response } from 'express';

import globalErrorHandler from './app/middlewares/globalErros';
import notFound from './app/middlewares/notFound';
import router from './app/routes/route';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.use('/api', router);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
