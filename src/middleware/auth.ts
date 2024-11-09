import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw new Error("Authorization header is required");
    }

    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      throw new Error("Invalid token format");
    }

    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;

    const user = await User.findOne({ _id: decodedPayload.id, "tokens.token": token });
    if (!user) {
      throw new Error("User not found");
    }

    (req as any).user = user;
    next();
  } catch (error: any) {
    const statusCode = error.message === "User not found" ? 404 : 401;
    res.status(statusCode).send({
      status: "failed",
      message: error.message,
      data: {},
    });
  }
};
