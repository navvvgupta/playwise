require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// database
const {connectDB} = require('./db/mongo');

//  routers
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');

// middleware
const errorMiddleware = require('./middleware/Error');

app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

app.use(errorMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();