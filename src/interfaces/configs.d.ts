import { Express } from "express";
export { };

declare global {

  type typeAggregate =
    | { $lookup: { from: string; localField: string; foreignField: string; as: string } }
    | { $unwind: string }
    | { $sort: { createdAt: number } }
    | { $skip: number }
    | { $limit: number }
    | { $match: Record<string, any> }
    | { $project: Record<string, any> };

  interface IConfig {
    MONGO_SOCIAL_NETWORK: string;
    PORT: process.env | number;
    whiteList: (process.env | string | undefined)[];
    SESSION_NAME: string
    SESSION_KEY: string
    JWT_ID_SESSION: string
  }

  interface CustomSession extends Express.Session {
    auth?: {
      User_id: string;
      email: string;
    };
  }
}