import express from 'express';
import routes from './routes';
import connectDB from './db-connection';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(routes);
connectDB();

app.get("/", (_, response) => {
  const currentDate = new Date().toDateString();
  const currentTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });

  response.status(200).json({
    status: "success",
    message: "Hello World!",
    date: currentDate,
    time: currentTime
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express is running on Port ${PORT}`);
});
