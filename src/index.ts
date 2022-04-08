import 'dotenv/config';
import express from 'express';
// import 'express-async-errors';
import morgan from 'morgan';
import { connectDB } from './config/db';
import errorHandler from './middlewares/errorHandler';
import { router } from './routes/userRoutes';

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
void connectDB();

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());
app.use('/images', express.static('images'));
app.use(router);
app.use(errorHandler);

//TODO: build your application here
const main = async (): Promise<void> => {
  //TODO: start your application here
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
};

main().catch(console.error);

// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
