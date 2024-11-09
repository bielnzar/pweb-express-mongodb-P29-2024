import express from "express";

const router = express.Router();

import authRoute from "./auth.route";
import bookRoute from "./book.route";
import mechanismRoute from "./mechanism.route";

router.use("/auth", authRoute);
router.use("/books", bookRoute);
router.use("/mechanism", mechanismRoute);

export default router;