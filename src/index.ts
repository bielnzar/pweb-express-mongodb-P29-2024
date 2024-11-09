import express from 'express';
import connectDB from './db-connection';
import bookRouter from './routes/book.route';
import mechanismRouter from './routes/mechanism.route';

const app = express();

app.use(express.json());
connectDB();

app.get("/", (_, response) => {
  response.status(200).send("Server is up and running 💫");
});

// Routes
app.use("/books", bookRouter);
app.use("/mechanism", mechanismRouter); // Tambahkan route mechanism

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Express is running on Port ${PORT}`);
});