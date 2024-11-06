import express from 'express';
import connectDB from './db-connection';
import bookrouter from './routes/book.route';

const app = express();

app.use(express.json());
connectDB();

app.get("/", (_, response) => {
  response.status(200).send("Server is up and running 💫");
});

app.use("/books", bookrouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Express is running on Port ${PORT}`);
});