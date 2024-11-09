import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { type NextFunction, type Request, type Response } from "express";
import dotenv from "dotenv";

dotenv.config();

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error("Authorization header is required");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Invalid token format");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("User not found");
    }

    next();
  } catch (error: any) {
    if (error.message === "User not found") {
      res.status(404).send({
        status: "failed",
        message: error.message,
        data: {},
      });
    } else {
      res.status(401).send({
        status: "failed",
        message: error.message,
        data: {},
      });
    }
  }
};
