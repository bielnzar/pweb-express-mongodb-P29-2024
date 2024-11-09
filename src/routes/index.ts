import express from "express";
import { auth } from "../middleware/auth";

const router = express.Router();

import authRoute from "./auth.route";
import bookRoute from "./book.route";
import mechanismRoute from "./mechanism.route";

router.use("/auth", authRoute);

router.use("/books", auth, bookRoute);   
router.use("/mechanism", auth, mechanismRoute);

export default router;
